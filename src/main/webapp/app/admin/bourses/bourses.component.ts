import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Scholarship {
  id: number;
  nom: string;
  type: string;
  montant: string;
  pays: string;
  organisme: string;
  dateLimite: string;
  statut: string;
  candidats: number;
  drapeau: string;
}

@Component({
  selector: 'jhi-bourses',
  standalone: true,
  imports: [NgIf, FormsModule, NgForOf],
  templateUrl: './bourses.component.html',
  styleUrl: './bourses.component.scss',
})
export default class BoursesComponent {
  searchTerm = '';
  filterType = 'all';
  filterStatus = 'all';
  selectedScholarship: Scholarship | null = null;

  scholarships: Scholarship[] = [
    {
      id: 1,
      nom: "Bourse d'Excellence PAES",
      type: 'Nationale',
      montant: '1,500,000 FCFA/an',
      pays: 'Sénégal',
      organisme: "Ministère de l'Enseignement Supérieur",
      dateLimite: '2024-12-15',
      statut: 'Active',
      candidats: 245,
      drapeau: '🇸🇳',
    },
    {
      id: 2,
      nom: 'Campus France',
      type: 'Internationale',
      montant: '€767/mois',
      pays: 'France',
      organisme: 'Campus France',
      dateLimite: '2024-11-30',
      statut: 'Active',
      candidats: 532,
      drapeau: '🇫🇷',
    },
    {
      id: 3,
      nom: 'Mastercard Foundation Scholars',
      type: 'Internationale',
      montant: 'Couverture totale',
      pays: 'Multi-pays',
      organisme: 'Mastercard Foundation',
      dateLimite: '2024-12-31',
      statut: 'Active',
      candidats: 1247,
      drapeau: '🌍',
    },
    {
      id: 4,
      nom: 'Bourse du Gouvernement Turc',
      type: 'Internationale',
      montant: '700-1000 TRY/mois',
      pays: 'Turquie',
      organisme: 'YTB',
      dateLimite: '2024-10-25',
      statut: 'Expirée',
      candidats: 189,
      drapeau: '🇹🇷',
    },
    {
      id: 5,
      nom: 'Bourse AIMS',
      type: 'Internationale',
      montant: 'Couverture totale',
      pays: 'Multi-pays',
      organisme: 'African Institute for Mathematical Sciences',
      dateLimite: '2024-12-20',
      statut: 'Active',
      candidats: 423,
      drapeau: '🌍',
    },
    {
      id: 6,
      nom: 'Bourse du Gouvernement Marocain',
      type: 'Internationale',
      montant: 'Variable',
      pays: 'Maroc',
      organisme: 'AMCI',
      dateLimite: '2024-11-15',
      statut: 'Active',
      candidats: 312,
      drapeau: '🇲🇦',
    },
  ];

  get filteredScholarships(): Scholarship[] {
    return this.scholarships.filter(
      s =>
        s.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.filterType === 'all' || s.type === this.filterType) &&
        (this.filterStatus === 'all' || s.statut === this.filterStatus),
    );
  }

  openDetails(scholarship: Scholarship): void {
    this.selectedScholarship = scholarship;
  }

  closeDetails(): void {
    this.selectedScholarship = null;
  }
}
