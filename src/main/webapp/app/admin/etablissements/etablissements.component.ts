import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Admission {
  campusen: boolean;
  dossier: boolean;
  concours: boolean;
  tauxAcceptation: string;
  pointsBAC: string;
}

export interface Institution {
  id: number;
  nom: string;
  type: 'Public' | 'Privé';
  ville: string;
  pays: string;
  classement: string;
  note: number;
  nbAvis: number;
  selectivite: string;
  international: string;
  fraisAn: string;
  filieres: string[];
  description: string;
  etudiants: number;
  enseignants: number;
  laboratoires: number;
  bibliotheques: number;
  tauxInsertion: string;
  salairesMoyen: string;
  admission: Admission;
  infrastructures: string[];
  associations: string[];
}

@Component({
  selector: 'jhi-etablissements',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, NgClass],
  templateUrl: './etablissements.component.html',
  styleUrls: ['./etablissements.component.scss'],
})
export default class EtablissementsComponent {
  // filtres
  searchTerm = '';
  filterType: 'all' | 'Public' | 'Privé' = 'all';
  filterVille = 'all';

  // modales / sélection
  selectedInstitution: Institution | null = null;
  showDeleteConfirm = false;
  institutionToDelete: Institution | null = null;

  // données complètes
  mockInstitutions: Institution[] = [
    /* tes 6 institutions ici */
  ];

  // getter filtré
  get filteredInstitutions(): Institution[] {
    return this.mockInstitutions.filter((inst: Institution) => {
      const matchesSearch = inst.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.filterType === 'all' || inst.type === this.filterType;
      const matchesVille = this.filterVille === 'all' || inst.ville === this.filterVille;
      return matchesSearch && matchesType && matchesVille;
    });
  }

  // ouvrir modal détails
  openDetails(inst: Institution): void {
    this.selectedInstitution = inst;
    setTimeout(() => {
      const el = document.querySelector('.modal-content');
      if (el) (el as HTMLElement).scrollTop = 0;
    }, 10);
  }

  closeDetails(): void {
    this.selectedInstitution = null;
  }

  // suppression
  openDelete(inst: Institution): void {
    this.institutionToDelete = inst;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.institutionToDelete = null;
    this.showDeleteConfirm = false;
  }

  confirmDelete(): void {
    if (!this.institutionToDelete) return;
    this.mockInstitutions = this.mockInstitutions.filter(i => i.id !== this.institutionToDelete!.id);

    // fermer modales si nécessaires
    if (this.selectedInstitution?.id === this.institutionToDelete.id) {
      this.closeDetails();
    }

    this.institutionToDelete = null;
    this.showDeleteConfirm = false;
  }

  // placeholders actions
  addInstitution(): void {
    alert('Ajouter un établissement (placeholder)');
  }

  editInstitution(inst: Institution): void {
    alert(`Éditer ${inst.nom} (placeholder)`);
  }
}
