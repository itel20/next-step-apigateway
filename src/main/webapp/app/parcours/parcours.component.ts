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
  faHeart,
  faMapMarkerAlt,
  faStar,
  faGlobe,
  faBookOpen,
  faBell,
  faTrophy,
  faCalendarAlt,
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
interface Ecole {
  nom: string;
  pays?: string;
  ville: string;
  type?: string;
  classement?: string; // ex: "#15"
  tauxSelectivite: number;
  tauxInternational: number;
  frais: number;
  note?: number; // ex 4.5
  avis?: number; // ex 156
  filieresDisponibles: string[];
  site?: string;
  favori?: boolean;
  open?: boolean;
}
interface Bourse {
  id: number;
  titre: string;
  tags?: string[]; // ex: ['Internationale','Urgent']
  montant: string; // ex "300£ - 500£"
  periodicite?: string; // ex 'Par Mois'
  beneficiaries?: string; // ex '45 000'
  acceptance?: string; // ex '76%'
  deadline?: string; // ISO date '2025-02-15'
  criteres?: string[]; // list
  type?: string;
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
  faHeart = faHeart;
  faMapMarkerAlt = faMapMarkerAlt;
  faStar = faStar;
  faGlobe = faGlobe;
  faBookOpen = faBookOpen;
  faBell = faBell;
  faTrophy = faTrophy;
  faCalendarAlt = faCalendarAlt;

  searchQuery = '';
  activeMenu = 1;
  searchQueryEcole = '';
  selectedType = '';
  selectedVille = '';
  villes = ['Dakar', 'Thiès', 'Saint-Louis', 'Ziguinchor'];

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
  ];

  ecolesList: Ecole[] = [
    {
      nom: 'Université Iba Der Thiam',
      pays: 'Sénégal',
      ville: 'Thiès',
      type: 'Publique',
      classement: '#15',
      tauxSelectivite: 76,
      tauxInternational: 25,
      frais: 25000,
      note: 4.5,
      avis: 156,
      filieresDisponibles: ['Droit', 'Lettres', 'Histoire', 'Medecine'],
      site: 'https://example.edu',
      favori: false,
    },
    {
      nom: 'Université Cheikh Anta Diop',
      pays: 'Sénégal',
      ville: 'Dakar',
      type: 'Publique',
      classement: '#05',
      tauxSelectivite: 68,
      tauxInternational: 30,
      frais: 30000,
      note: 4.3,
      avis: 210,
      filieresDisponibles: ['Informatique', 'Gestion', 'Maths'],
      site: 'https://ucad.sn',
      favori: true,
    },
    {
      nom: 'Institut des Technologies du Digital',
      pays: 'Sénégal',
      ville: 'Dakar',
      type: 'Privée',
      classement: '#42',
      tauxSelectivite: 40,
      tauxInternational: 12,
      frais: 250000,
      note: 4.0,
      avis: 48,
      filieresDisponibles: ['Développement', 'Design', 'Data Science'],
      site: 'https://itd.sn',
      favori: false,
    },
    // clone quelques items pour remplir la grille en demo
    {
      nom: 'Ecole Polytechnique de Thiès',
      pays: 'Sénégal',
      ville: 'Thiès',
      type: 'Publique',
      classement: '#22',
      tauxSelectivite: 70,
      tauxInternational: 18,
      frais: 18000,
      note: 4.1,
      avis: 89,
      filieresDisponibles: ['Génie Civil', 'Électronique'],
      site: '',
      favori: false,
    },
  ];
  boursesList: Bourse[] = [
    {
      id: 1,
      titre: 'Bourse Erasmus +',
      tags: ['Internationale', 'Urgent'],
      montant: '300£ - 500£',
      periodicite: 'Par Mois',
      beneficiaries: '45 000',
      acceptance: '76%',
      deadline: '2025-02-15',
      criteres: ['Mobilité européenne', 'Niveau BAC minimum'],
      type: 'Bourse',
    },
    {
      id: 2,
      titre: 'Bourse ESP',
      tags: ['Internationale', 'Urgent'],
      montant: '300£ - 500£',
      periodicite: 'Par Mois',
      beneficiaries: '45 000',
      acceptance: '76%',
      deadline: '2025-02-15',
      criteres: ['Mobilité européenne', 'Niveau BAC minimum'],
      type: 'Bourse',
    },
    {
      id: 3,
      titre: 'Bourse Recherche',
      tags: ['National', 'Important'],
      montant: '500£ - 900£',
      periodicite: 'Par Mois',
      beneficiaries: '10 000',
      acceptance: '40%',
      deadline: '2025-06-30',
      criteres: ['Projet de recherche', 'Lettre de motivation'],
      type: 'Concours',
    },
  ];
  boursesListFiltrees = [...this.boursesList];
  bourseSearchQuery = '';
  bourseSelectedType = '';
  ecolesListFiltrees = [...this.ecolesList];
  parcoursListFiltrees = [...this.parcoursList];

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
      faHeart,
      faMapMarkerAlt,
      faStar,
      faGlobe,
      faBookOpen,
      faBell,
      faTrophy,
      faCalendarAlt,
    );
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.parcoursListFiltrees = this.parcoursList.filter(ec => ec.titre.toLowerCase().includes(query));
  }
  onSearchEcole(): void {
    const q = this.searchQueryEcole.toLowerCase();
    this.ecolesListFiltrees = this.ecolesList.filter(
      e =>
        e.nom.toLowerCase().includes(q) ||
        e.ville.toLowerCase().includes(q) ||
        e.filieresDisponibles.some(f => f.toLowerCase().includes(q)),
    );
  }
  onSearchBourse(): void {
    const q = this.bourseSearchQuery.toLowerCase();
    this.boursesListFiltrees = this.boursesList.filter(
      b => b.titre.toLowerCase().includes(q) || (b.tags ?? []).some(t => t.toLowerCase().includes(q)) || b.type?.toLowerCase().includes(q),
    );
  }
  filterEcoles(): void {
    this.ecolesListFiltrees = this.ecolesList.filter(ec => {
      const passesType = !this.selectedType || ec.type === this.selectedType;
      const passesVille = !this.selectedVille || ec.ville === this.selectedVille;
      return passesType && passesVille;
    });
  }
  filterBourses(): void {
    this.boursesListFiltrees = this.boursesList.filter(b => {
      return !this.bourseSelectedType || b.type === this.bourseSelectedType;
    });
  }

  voirDetailsEcole(eco: Ecole): void {
    // Intégrer la navigation ou modal ici.
  }
  voirDetailsBourse(b: Bourse): void {
    // placeholder: open modal or navigate
  }
  toggleFavori(e: Ecole): void {
    e.favori = !e.favori;
  }
  formatPrice(n: number): string {
    return n ? n.toLocaleString('fr-FR') : '';
  }

  onFilter(): void {
    // Ajoute ta logique de filtre ici
  }

  openDetail(item: Parcours): void {
    // Navigation ou modal ici
  }
  openSite(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
  formatDateIso(d?: string): string {
    if (!d) return '';
    const dt = new Date(d);
    return dt.toLocaleDateString('fr-FR');
  }
}
