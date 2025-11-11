import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Etablissement {
  id: number;
  nom: string;
  type: string;
  region: string;
  filieres: number;
  statut: string;
  tauxInsertion: string;
  contact: string;
  siteWeb: string;
}

@Component({
  selector: 'jhi-etablissements',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './etablissements.component.html',
  styleUrl: './etablissements.component.scss',
})
export default class EtablissementsComponent {
  searchTerm = '';
  filterType = 'all';
  filterRegion = 'all';
  selectedInstitution: Etablissement | null = null;

  institutions: Etablissement[] = [
    {
      id: 1,
      nom: 'Université Cheikh Anta Diop (UCAD)',
      type: 'Public',
      region: 'Dakar',
      filieres: 42,
      statut: 'Validé',
      tauxInsertion: '78%',
      contact: 'contact@ucad.edu.sn',
      siteWeb: 'www.ucad.sn',
    },
    {
      id: 2,
      nom: 'Université Gaston Berger (UGB)',
      type: 'Public',
      region: 'Saint-Louis',
      filieres: 28,
      statut: 'Validé',
      tauxInsertion: '75%',
      contact: 'info@ugb.edu.sn',
      siteWeb: 'www.ugb.sn',
    },
    {
      id: 3,
      nom: 'École Supérieure Polytechnique (ESP)',
      type: 'Public',
      region: 'Dakar',
      filieres: 15,
      statut: 'Validé',
      tauxInsertion: '92%',
      contact: 'esp@ucad.edu.sn',
      siteWeb: 'www.esp.sn',
    },
    {
      id: 4,
      nom: 'Institut Africain de Management (IAM)',
      type: 'Privé',
      region: 'Dakar',
      filieres: 12,
      statut: 'En attente',
      tauxInsertion: '68%',
      contact: 'admission@iam.edu.sn',
      siteWeb: 'www.iam.sn',
    },
    {
      id: 5,
      nom: 'Université Alioune Diop de Bambey',
      type: 'Public',
      region: 'Diourbel',
      filieres: 18,
      statut: 'Validé',
      tauxInsertion: '71%',
      contact: 'info@uadb.edu.sn',
      siteWeb: 'www.uadb.edu.sn',
    },
    {
      id: 6,
      nom: 'Groupe HECI Polytechnique',
      type: 'Privé',
      region: 'Dakar',
      filieres: 20,
      statut: 'Validé',
      tauxInsertion: '85%',
      contact: 'info@heci.sn',
      siteWeb: 'www.heci.sn',
    },
  ];

  get filteredInstitutions(): Etablissement[] {
    return this.institutions.filter(i => {
      const matchesSearch = i.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.filterType === 'all' || i.type === this.filterType;
      const matchesRegion = this.filterRegion === 'all' || i.region === this.filterRegion;
      return matchesSearch && matchesType && matchesRegion;
    });
  }

  openDetails(institution: Etablissement): void {
    this.selectedInstitution = institution;
  }

  closeDetails(): void {
    this.selectedInstitution = null;
  }
}
