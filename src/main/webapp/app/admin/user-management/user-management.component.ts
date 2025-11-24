import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { EleveService } from './user-management.service';
import { Eleve, IEleve } from './user-management.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'jhi-user-management',
  standalone: true,
  imports: [FormsModule, CommonModule, NgClass, NgIf, NgForOf, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export default class UserManagementComponent implements OnInit {
  users: IEleve[] = [];
  filteredUsers: IEleve[] = [];
  selectedUser: IEleve | null = null;
  searchTerm = '';
  filterType = 'all';
  loading = false;
  showModal = false;
  isEditing = false;
  formData: IEleve = new Eleve();

  constructor(private eleveService: EleveService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.eleveService
      .getAll(true)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: data => {
          this.users = data;
          this.applyFilters();
        },
        error: err => console.error('Erreur récupération utilisateurs', err),
      });
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredUsers = this.users.filter(user => {
      const matchesSearch =
        user.nom.toLowerCase().includes(term) || user.prenom.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);

      const matchesType = this.filterType === 'all' || user.user?.type === this.filterType || user.niveauEtude === this.filterType;

      return matchesSearch && matchesType;
    });
  }

  // ===========================
  // 🔹 Ouvrir modal (Créer)
  // ===========================
  openCreate(): void {
    this.isEditing = false;
    this.formData = new Eleve(); // Reset form
    this.formData.user = { type: '', statut: 'Actif' };
    this.formData.password = ''; // ⚠️ NE PAS OUBLIER LE PASSWORD
    this.showModal = true;
  }

  // ===========================
  // 🔹 Ouvrir modal (Modifier)
  // ===========================
  openEdit(user: IEleve): void {
    this.isEditing = true;
    this.formData = { ...user }; // Clone pour éviter modification directe
    this.showModal = true;
  }

  // ===========================
  // 🔹 Fermer le modal
  // ===========================
  closeModal(): void {
    this.showModal = false;
  }

  // ===========================
  // 🔹 Enregistrer (create / update)
  // ===========================
  save(): void {
    if (!this.isEditing) {
      // ⚠️ Important pour Keycloak ou backend
      this.formData.user.password = this.formData.password;

      this.eleveService.create(this.formData).subscribe({
        next: created => {
          this.users.push(created);
          this.applyFilters();
          this.closeModal();
        },
        error: err => console.error('Erreur create', err),
      });
    } else {
      // UPDATE
      if (this.formData.id != null) {
        this.eleveService.update(this.formData.id, this.formData).subscribe({
          next: updated => {
            this.users = this.users.map(u => (u.id === updated.id ? updated : u));
            this.applyFilters();
            this.closeModal();
          },
          error: err => console.error('Erreur update', err),
        });
      }
    }
  }

  openDetails(user: IEleve): void {
    this.selectedUser = user;
  }

  closeDetails(): void {
    this.selectedUser = null;
  }

  toggleStatut(user: IEleve): void {
    const newStatut = user.user?.statut === 'Actif' ? 'Suspendu' : 'Actif';
    if (user.id != null) {
      this.eleveService.updateStatut(user.id, newStatut).subscribe({
        next: updatedUser => {
          user.user = updatedUser.user;
          this.applyFilters();
        },
        error: err => console.error('Erreur mise à jour statut', err),
      });
    }
  }

  deleteUser(user: IEleve): void {
    if (user.id != null && confirm(`Voulez-vous vraiment supprimer ${user.prenom} ${user.nom} ?`)) {
      this.eleveService.delete(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.applyFilters();
        },
        error: err => console.error('Erreur suppression utilisateur', err),
      });
    }
  }
}
