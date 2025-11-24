import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { EleveService } from './user-management.service';
import { IEleve } from './user-management.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'jhi-user-management',
  standalone: true,
  imports: [FormsModule, CommonModule, NgClass, NgIf, NgForOf],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export default class UserManagementComponent {
  users: IEleve[] = [];
  filteredUsers: IEleve[] = [];
  selectedUser: IEleve | null = null;
  searchTerm = '';
  filterType = 'all';
  loading = false;

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
    this.filteredUsers = this.users.filter(u => {
      const matchesSearch =
        u.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesType = this.filterType === 'all' || u.user?.type === this.filterType || u.niveauEtude === this.filterType;
      return matchesSearch && matchesType;
    });
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
