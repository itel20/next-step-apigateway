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

  constructor(private etablissementService: EtablissementService) {}

  ngOnInit(): void {
    this.loadEtablissements();
  }

  loadEtablissements(): void {
    this.etablissementService.getAll().subscribe(data => {
      this.etablissements = data;
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

  selectInstitution(inst: EtablissementDTO): void {
    this.selectedInstitution = inst;
  }

  closeDialog(): void {
    this.selectedInstitution = null;
  }

  editInstitution(inst: EtablissementDTO): void {
    this.selectedInstitution = inst;
    // Ici tu peux ouvrir un formulaire d'édition
  }

  deleteInstitution(inst: EtablissementDTO): void {
    if (confirm(`Supprimer ${inst.nom} ?`)) {
      this.etablissementService.delete(inst.id!).subscribe(() => this.loadEtablissements());
    }
  }

  openForm(): void {
    this.selectedInstitution = {
      nom: '',
      type: '',
      ville: '',
      pays: '',
      classement: 0,
      nombreEtudiants: 0,
      nombreEnseignants: 0,
      laboratoiresBibliotheques: '',
      fraisScolarite: 0,
      tauxSelectivite: 0,
      filieresDisponibles: [],
      processusAdmission: '',
      tauxAcceptation: 0,
      pointsBacRequis: '',
      vieEtudiante: '',
      informationsPratiques: '',
      tauxInsertion: 0,
      salaireMoyen: 0,
      temoignages: '',
    };
  }
}
