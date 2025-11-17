import { Component, OnInit } from '@angular/core';
import { EtablissementService } from './etablissements.service';
import { EtablissementDTO } from './etablissement.model';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'jhi-etablissements',
  templateUrl: './etablissements.component.html',
  styleUrls: ['./etablissements.component.scss'],
  imports: [NgClass, NgForOf, FormsModule, NgIf],
  standalone: true,
})
export default class EtablissementsComponent implements OnInit {
  searchTerm = '';
  filterType = 'all';
  filterVille = 'all';

  etablissements: EtablissementDTO[] = [];
  selectedInstitution: EtablissementDTO | null = null;

  // Gestion modal création/édition
  showFormModal = false;
  editingInstitution = false;
  formInstitution: EtablissementDTO = this.resetFormInstitution();

  constructor(private etablissementService: EtablissementService) {}

  ngOnInit(): void {
    this.loadEtablissements();
  }

  loadEtablissements(): void {
    this.etablissementService.getAll().subscribe(data => {
      this.etablissements = data.map(e => ({
        ...e,
        // filieresDisponibles est déjà un tableau, pas besoin de fallback
      }));
    });
  }

  get filteredInstitutions(): EtablissementDTO[] {
    return this.etablissements.filter(e => {
      const matchesSearch = e.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.filterType === 'all' || e.type === this.filterType;
      const matchesVille = this.filterVille === 'all' || e.ville === this.filterVille;
      return matchesSearch && matchesType && matchesVille;
    });
  }

  // Modal détails
  selectInstitution(inst: EtablissementDTO): void {
    this.selectedInstitution = inst;
  }

  closeDialog(): void {
    this.selectedInstitution = null;
    this.showFormModal = false;
  }

  editInstitution(inst: EtablissementDTO): void {
    this.formInstitution = { ...inst };
    this.editingInstitution = true;
    this.showFormModal = true;
  }

  deleteInstitution(inst: EtablissementDTO): void {
    if (inst.id && confirm(`Supprimer ${inst.nom} ?`)) {
      this.etablissementService.delete(inst.id).subscribe(() => this.loadEtablissements());
    }
  }

  // Ouvrir le formulaire création
  openForm(): void {
    this.formInstitution = this.resetFormInstitution();
    this.editingInstitution = false;
    this.showFormModal = true;
  }
  closeForm(): void {
    this.showFormModal = false;
    this.editingInstitution = false;
    this.formInstitution = {} as any;
  }

  // Soumettre formulaire création/édition
  saveInstitution(): void {
    const payload: EtablissementDTO = { ...this.formInstitution };
    if (!this.editingInstitution) {
      delete payload.id; // <-- supprime l'id avant la création
      this.etablissementService.create(payload).subscribe(() => {
        this.loadEtablissements();
        this.showFormModal = false;
      });
    } else {
      this.etablissementService.update(payload.id!, payload).subscribe(() => {
        this.loadEtablissements();
        this.showFormModal = false;
      });
    }
  }

  // Réinitialiser l'objet formulaire
  resetFormInstitution(): EtablissementDTO {
    return {
      filieresDisponibles: '',
      id: 0,
      nom: '',
      type: 'Public',
      ville: '',
      pays: '',
      classement: 0,
      nombreEtudiants: 0,
      nombreEnseignants: 0,
      tauxSelectivite: 0,
      fraisScolarite: 0,
      processusAdmission: '',
      tauxAcceptation: 0,
      pointsBacRequis: '',
      vieEtudiante: '',
      laboratoiresBibliotheques: '',
      informationsPratiques: '',
      tauxInsertion: 0,
      salaireMoyen: 0,
      temoignages: '',
    };
  }
}
