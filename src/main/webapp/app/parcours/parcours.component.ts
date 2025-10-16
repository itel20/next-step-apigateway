import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faBriefcase,
  faUniversity,
  faGraduationCap,
  faSearch,
  faFilter,
  faArrowRight,
  faBug,
  faDollarSign,
  faStopwatch,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

interface Parcours {
  id: number;
  titre: string;
  categorie: string;
  difficulte: string;
  emploi: number;
  satisfaction: number;
  tauxEmploi: number;
  salaire: string;
  duree: string;
}

@Component({
  selector: 'jhi-parcours',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.scss'],
})
export default class ParcoursComponent {
  faBriefcase = faBriefcase;
  faUniversity = faUniversity;
  faGraduationCap = faGraduationCap;
  faSearch = faSearch;
  faFilter = faFilter;
  faArrowRight = faArrowRight;
  faBug = faBug;
  faDollarSign = faDollarSign;
  faStopwatch = faStopwatch;
  faBars = faBars;

  searchQuery = '';

  parcoursList: Parcours[] = [
    {
      id: 1,
      titre: 'Médecine',
      categorie: 'Santé',
      difficulte: '9/10',
      emploi: 96,
      satisfaction: 88,
      tauxEmploi: 96,
      salaire: '1 200 000 - 2 000 000',
      duree: '6-12 ans',
    },
    {
      id: 2,
      titre: 'Information',
      categorie: 'Informatique',
      difficulte: '8/10',
      emploi: 96,
      satisfaction: 88,
      tauxEmploi: 96,
      salaire: '1 200 000 - 2 000 000',
      duree: '4-6 ans',
    },
    {
      id: 3,
      titre: 'Gestion',
      categorie: 'Gestion',
      difficulte: '9/10',
      emploi: 96,
      satisfaction: 88,
      tauxEmploi: 96,
      salaire: '1 200 000 - 2 000 000',
      duree: '3-5 ans',
    },
    {
      id: 4,
      titre: 'Médecine',
      categorie: 'Santé',
      difficulte: '9/10',
      emploi: 96,
      satisfaction: 88,
      tauxEmploi: 96,
      salaire: '1 200 000 - 2 000 000',
      duree: '6-12 ans',
    },
    {
      id: 5,
      titre: 'Médecine',
      categorie: 'Santé',
      difficulte: '9/10',
      emploi: 96,
      satisfaction: 88,
      tauxEmploi: 96,
      salaire: '1 200 000 - 2 000 000',
      duree: '6-12 ans',
    },
    {
      id: 6,
      titre: 'Médecine',
      categorie: 'Santé',
      difficulte: '9/10',
      emploi: 96,
      satisfaction: 88,
      tauxEmploi: 96,
      salaire: '1 200 000 - 2 000 000',
      duree: '6-12 ans',
    },
  ];

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faBriefcase,
      faUniversity,
      faGraduationCap,
      faSearch,
      faFilter,
      faArrowRight,
      faBug,
      faDollarSign,
      faStopwatch,
      faBars,
    );
  }

  onSearch(): void {
    // Ajoute ta logique de recherche ici si besoin
  }

  onFilter(): void {
    // Ajoute ta logique de filtre ici
  }

  openDetail(item: Parcours): void {
    // Navigation ou modal ici
  }
}
