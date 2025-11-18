import { Component, OnInit } from '@angular/core';
import { FilieresService } from './orientation.service';
import { Filiere } from './orientation.model';
import { DecimalPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'jhi-orientations',
  standalone: true,
  imports: [NgClass, NgForOf, NgIf, FormsModule, DecimalPipe],
  templateUrl: './orientations.component.html',
  styleUrls: ['./orientations.component.scss'],
})
export default class OrientationsComponent implements OnInit {
  searchTerm = '';
  filieres: Filiere[] = [];
  selectedOrientation: Filiere | null = null;
  showFormModal = false;
  editingFiliere: Filiere | null = null;
  formData: any = {
    titre: '',
    categorie: '',
    descriptionDetaillee: '',
    difficulte: 1,
    tauxEmploi: 0,
    satisfaction: 0,
    salaireMoyen: 0,
    dureeFormation: '',
    universitesStr: '',
    debouchesStr: '',
    competencesStr: '',
    temoignages: '',
  };
  protected readonly alert = alert;

  // Modal création/édition

  constructor(private filieresService: FilieresService) {}

  ngOnInit(): void {
    this.loadFilieres();
  }

  loadFilieres(): void {
    this.filieresService.getAll().subscribe({
      next: (data: Filiere[]) => (this.filieres = data),
      error: (err: unknown) => console.error('Erreur récupération filières', err),
    });
  }

  get filteredOrientations(): Filiere[] {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) return this.filieres;
    return this.filieres.filter((f: Filiere) => f.titre.toLowerCase().includes(q) || f.categorie.toLowerCase().includes(q));
  }

  // ---------------- Formulaire ----------------
  openForm(f?: Filiere): void {
    if (f) {
      this.editingFiliere = f;
      this.formData = {
        ...f,
        universitesStr: f.universites?.join(', ') ?? '',
        debouchesStr: f.debouches?.join(', ') ?? '',
      };
    } else {
      this.editingFiliere = null;
      this.formData = {
        titre: '',
        categorie: '',
        descriptionDetaillee: '',
        difficulte: 1,
        tauxEmploi: 0,
        satisfaction: 0,
        salaireMoyen: 0,
        dureeFormation: '',
        universitesStr: '',
        debouchesStr: '',
        competencesStr: '',
        temoignages: '',
      };
    }
    this.showFormModal = true;
  }

  closeForm(): void {
    this.showFormModal = false;
  }

  submitForm(): void {
    const newFiliere: Filiere = {
      id: this.editingFiliere?.id,
      titre: this.formData.titre,
      categorie: this.formData.categorie,
      descriptionDetaillee: this.formData.descriptionDetaillee,
      difficulte: this.formData.difficulte,
      tauxEmploi: Number(this.formData.tauxEmploi),
      satisfaction: Number(this.formData.satisfaction),
      salaireMoyen: Number(this.formData.salaireMoyen),
      dureeFormation: this.formData.dureeFormation,

      universites: this.formData.universitesStr ? this.formData.universitesStr.split(',').map((u: string) => u.trim()) : [],

      debouches: this.formData.debouchesStr ? this.formData.debouchesStr.split(',').map((d: string) => d.trim()) : [],

      competences: this.formData.competencesStr ? this.formData.competencesStr.split(',').map((c: string) => c.trim()) : [],

      temoignages: this.formData.temoignages, // backend attend STRING
    };

    if (this.editingFiliere) {
      // Mise à jour
      this.filieresService.update(this.editingFiliere.id!, newFiliere).subscribe({
        next: (res: Filiere) => {
          const index = this.filieres.findIndex(f => f.id === res.id);
          if (index !== -1) this.filieres[index] = res;
          if (this.selectedOrientation?.id === res.id) this.selectedOrientation = res;
          this.closeForm();
        },
        error: (err: unknown) => console.error(err),
      });
    } else {
      // Création
      this.filieresService.create(newFiliere).subscribe({
        next: (res: Filiere) => {
          this.filieres.push(res);
          this.closeForm();
        },
        error: (err: unknown) => console.error(err),
      });
    }
  }

  // ---------------- Détails et actions ----------------
  openDetails(f: Filiere): void {
    this.selectedOrientation = f;
  }

  closeDetails(): void {
    this.selectedOrientation = null;
  }

  deleteOrientation(f: Filiere): void {
    if (!f.id) return;
    if (!confirm(`Confirmer la suppression de "${f.titre}" ?`)) return;

    this.filieresService.delete(f.id).subscribe({
      next: () => {
        this.filieres = this.filieres.filter(x => x.id !== f.id);
        if (this.selectedOrientation?.id === f.id) this.closeDetails();
      },
      error: (err: unknown) => console.error(err),
    });
  }

  // ---------------- Helpers ----------------
  difficultyClass(d: string): string {
    switch (d) {
      case 'Très élevée':
        return 'Difficile';
      case 'Élevée':
        return 'Difficile';
      case 'Moyenne':
        return 'Moyen';
      default:
        return 'Facile';
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }
}
