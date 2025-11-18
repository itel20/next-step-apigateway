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
  filieresTemp = '';

  etablissements: EtablissementDTO[] = [];
  selectedInstitution: EtablissementDTO | null = null;

  showFormModal = false;
  editingInstitution = false;

  formInstitution: EtablissementDTO = this.resetFormInstitution();

  constructor(private etablissementService: EtablissementService) {}

  ngOnInit(): void {
    this.loadEtablissements();
  }

  // -----------------------------------------------------------
  // CHARGEMENT
  // -----------------------------------------------------------
  loadEtablissements(): void {
    this.etablissements = [];
    this.etablissementService.getAll().subscribe(data => {
      this.etablissements = data.map(inst => ({
        ...inst,
        filieresDisponibles: Array.isArray(inst.filieresDisponibles) ? inst.filieresDisponibles : [],
      }));
    });
  }

  // -----------------------------------------------------------
  // FILTRES + RECHERCHE
  // -----------------------------------------------------------
  get filteredInstitutions(): EtablissementDTO[] {
    return this.etablissements.filter(e => {
      const matchesSearch = e.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.filterType === 'all' || e.type === this.filterType;
      const matchesVille = this.filterVille === 'all' || e.ville === this.filterVille;
      return matchesSearch && matchesType && matchesVille;
    });
  }

  // -----------------------------------------------------------
  // VOIR
  // -----------------------------------------------------------
  selectInstitution(inst: EtablissementDTO): void {
    this.selectedInstitution = inst;
  }

  closeDialog(): void {
    this.selectedInstitution = null;
    this.showFormModal = false;
  }

  // -----------------------------------------------------------
  // EDITION
  // -----------------------------------------------------------
  editInstitution(inst: EtablissementDTO): void {
    this.formInstitution = { ...inst };

    this.filieresTemp = Array.isArray(inst.filieresDisponibles) ? inst.filieresDisponibles.join(', ') : '';

    this.editingInstitution = true;
    this.showFormModal = true;
  }

  // -----------------------------------------------------------
  // SUPPRESSION
  // -----------------------------------------------------------
  deleteInstitution(inst: EtablissementDTO): void {
    if (inst.id && confirm(`Supprimer ${inst.nom} ?`)) {
      this.etablissementService.delete(inst.id).subscribe(() => this.loadEtablissements());
    }
  }

  // -----------------------------------------------------------
  // OUVRIR FORM CREATION
  // -----------------------------------------------------------
  openForm(): void {
    this.formInstitution = this.resetFormInstitution();
    this.editingInstitution = false;
    this.showFormModal = true;
  }

  closeForm(): void {
    this.showFormModal = false;
    this.editingInstitution = false;
    this.formInstitution = this.resetFormInstitution();
  }

  // -----------------------------------------------------------
  // SAVE CREATE / UPDATE
  // -----------------------------------------------------------
  saveInstitution(): void {
    const hasFilieres = this.filieresTemp.trim().length > 0;

    const payload: EtablissementDTO = {
      ...this.formInstitution,
      filieresDisponibles: hasFilieres ? this.filieresTemp.split(',').map(f => f.trim()) : [],
    };

    if (this.editingInstitution && payload.id) {
      this.etablissementService.update(payload.id, payload).subscribe(() => {
        this.loadEtablissements();
        this.showFormModal = false;
      });
    } else {
      this.etablissementService.create(payload).subscribe(() => {
        this.loadEtablissements();
        this.showFormModal = false;
      });
    }
  }

  // -----------------------------------------------------------
  // RESET FORM INITIAL
  // -----------------------------------------------------------
  resetFormInstitution(): EtablissementDTO {
    return {
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
      filieresDisponibles: [],
    };
  }
}
