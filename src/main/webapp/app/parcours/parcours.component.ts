import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FiliereService, FiliereDTO, BourseConcoursDTO } from './parcours.service';
import { BourseConcours } from '../admin/bourses/bourse.model';

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
  faTimes,
  faChartBar,
  faClipboardList,
  faSmile,
  faComment,
  faInfoCircle,
  faUsers,
  faUserTie,
  faFlask,
  faBook,
  faMoneyBill,
  faHome,
  faUserGraduate,
  faQuoteLeft,
  faClipboardCheck,
  faUsersLine,
} from '@fortawesome/free-solid-svg-icons';

interface Ecole {
  nom: string;
  pays: string;
  ville: string;
  type: string;
  classement: string;
  tauxSelectivite: number;
  tauxInternational: number;
  frais: number;
  note: number;
  avis: number;
  filieresDisponibles: string[];
  site: string;
  favori: boolean;
  description: string[];

  stats: {
    etudiants: number;
    enseignants: number;
    laboratoires: number;
    bibliotheques: number;
  };

  filieres: {
    nom: string;
    etudiants: number;
  }[];

  admission: {
    campusen: boolean;
    dossier: boolean;
    concours: boolean;
    tauxAcceptation: number;
    pointsBAC: string;
  };

  vie: {
    associations: number;
    activites: number;
    clubs: number;
  };

  temoignage: {
    nom: string;
    niveau: string;
    commentaire: string;
  };
  insertion?: {
    tauxInsertion: number;
    salaireMoyen: string;
  };

  infosPratiques?: {
    label: string;
    valeur: string;
  }[];
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
export default class ParcoursComponent implements OnInit {
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
  faTimes = faTimes;
  faChartBar = faChartBar;
  faClipboardList = faClipboardList;
  faSmile = faSmile;
  faComment = faComment;
  faInfoCircle = faInfoCircle;
  faUsers = faUsers;
  faUserTie = faUserTie;
  faFlask = faFlask;
  faBook = faBook;
  faMoneyBill = faMoneyBill;
  faHome = faHome;
  faUserGraduate = faUserGraduate;
  faQuoteLeft = faQuoteLeft;
  faClipboardCheck = faClipboardCheck;
  faUsersLine = faUsersLine;

  @Input() ecole: any;
  @Input() onClose!: () => void;

  searchQuery = '';
  activeMenu = 1;
  searchQueryEcole = '';
  selectedType = '';
  selectedVille = '';
  villes = ['Dakar', 'Thiès', 'Saint-Louis', 'Ziguinchor'];
  selectedEcole: any = null;
  showFiche = false;
  filieres: FiliereDTO[] = [];
  selectedFiliere: FiliereDTO | null = null;
  boursesList: BourseConcoursDTO[] = [];
  boursesListFiltrees: BourseConcoursDTO[] = [];

  ecolesList: Ecole[] = [
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
      filieresDisponibles: ['Informatique', 'Gestion', 'Mathématiques'],
      site: 'https://ucad.sn',
      favori: false,
      description: [
        'Fondée en 1957, l’Université Cheikh Anta Diop (UCAD) est l’une des plus prestigieuses universités d’Afrique francophone.',
        'Elle offre des formations dans plusieurs domaines et accueille des étudiants venus de tout le continent.',
        'L’UCAD se distingue par la richesse de ses programmes et la qualité de sa recherche.',
      ],
      stats: { etudiants: 30000, enseignants: 1200, laboratoires: 25, bibliotheques: 4 },
      filieres: [
        { nom: 'Informatique', etudiants: 3200 },
        { nom: 'Gestion', etudiants: 4100 },
        { nom: 'Médecine', etudiants: 2500 },
      ],
      admission: {
        campusen: true,
        dossier: true,
        concours: false,
        tauxAcceptation: 65,
        pointsBAC: '12/20',
      },
      vie: { associations: 25, activites: 80, clubs: 15 },
      insertion: { tauxInsertion: 90, salaireMoyen: '1 200 000 - 2 000 000 CFA' },
      infosPratiques: [
        { label: 'Frais de scolarité', valeur: '30 000 CFA/an' },
        { label: 'Capacité d’accueil', valeur: '30 000 étudiants' },
        { label: 'Bourses', valeur: '60% des étudiants' },
        { label: 'Logement', valeur: '4 000 places/an' },
      ],
      temoignage: {
        nom: 'Aïssatou Diop',
        niveau: 'Master 2 Informatique',
        commentaire: 'Étudier à l’UCAD m’a permis de rencontrer des étudiants passionnés et des professeurs inspirants.',
      },
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
      description: [
        'L’Institut des Technologies du Digital (ITD) forme les futurs experts du numérique.',
        'Les programmes mettent l’accent sur la pratique et la collaboration avec les entreprises tech.',
        'L’école se distingue par son innovation pédagogique et ses projets réels.',
      ],
      stats: { etudiants: 1200, enseignants: 60, laboratoires: 6, bibliotheques: 1 },
      filieres: [
        { nom: 'Développement Web', etudiants: 400 },
        { nom: 'Design Graphique', etudiants: 300 },
        { nom: 'Data Science', etudiants: 200 },
      ],
      admission: {
        campusen: false,
        dossier: true,
        concours: true,
        tauxAcceptation: 45,
        pointsBAC: '10/20',
      },
      vie: { associations: 8, activites: 25, clubs: 6 },
      insertion: { tauxInsertion: 75, salaireMoyen: '800 000 - 1 500 000 CFA' },
      infosPratiques: [
        { label: 'Frais de scolarité', valeur: '250 000 CFA/an' },
        { label: 'Capacité d’accueil', valeur: '1 200 étudiants' },
        { label: 'Bourses', valeur: '30% des étudiants' },
        { label: 'Logement', valeur: '200 places/an' },
      ],
      temoignage: {
        nom: 'Moussa Ndiaye',
        niveau: 'Licence 3 Data Science',
        commentaire: 'L’ambiance est excellente, et les enseignants sont très disponibles pour les étudiants.',
      },
    },
    {
      nom: 'Université Gaston Berger',
      pays: 'Sénégal',
      ville: 'Saint-Louis',
      type: 'Publique',
      classement: '#09',
      tauxSelectivite: 72,
      tauxInternational: 20,
      frais: 20000,
      note: 4.2,
      avis: 175,
      filieresDisponibles: ['Sociologie', 'Économie', 'Sciences Politiques'],
      site: 'https://ugb.sn',
      favori: false,
      description: [
        'L’Université Gaston Berger (UGB) se distingue par sa rigueur académique et son environnement calme.',
        'Elle encourage la recherche et l’innovation dans plusieurs domaines.',
        'Son campus est l’un des plus agréables du Sénégal.',
      ],
      stats: { etudiants: 10000, enseignants: 600, laboratoires: 15, bibliotheques: 3 },
      filieres: [
        { nom: 'Sociologie', etudiants: 900 },
        { nom: 'Économie', etudiants: 1200 },
        { nom: 'Droit', etudiants: 1000 },
      ],
      admission: {
        campusen: true,
        dossier: true,
        concours: false,
        tauxAcceptation: 70,
        pointsBAC: '11/20',
      },
      vie: { associations: 20, activites: 60, clubs: 10 },
      insertion: { tauxInsertion: 85, salaireMoyen: '900 000 - 1 700 000 CFA' },
      infosPratiques: [
        { label: 'Frais de scolarité', valeur: '20 000 CFA/an' },
        { label: 'Capacité d’accueil', valeur: '10 000 étudiants' },
        { label: 'Bourses', valeur: '50% des étudiants' },
        { label: 'Logement', valeur: '1 000 places/an' },
      ],
      temoignage: {
        nom: 'Fatou Ba',
        niveau: 'Licence 2 Économie',
        commentaire: 'C’est une université très sérieuse, mais avec une belle ambiance étudiante.',
      },
    },
  ];

  bourseSearchQuery = '';
  bourseSelectedType = '';
  ecolesListFiltrees = [...this.ecolesList];

  constructor(
    private filiereService: FiliereService,
    private bcService: FiliereService,
    library: FaIconLibrary,
  ) {
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
      faHeart,
      faMapMarkerAlt,
      faStar,
      faGlobe,
      faBookOpen,
      faBell,
      faTrophy,
      faCalendarAlt,
      faTimes,
      faChartBar,
      faClipboardList,
      faSmile,
      faComment,
      faInfoCircle,
      faUsers,
      faUserTie,
      faFlask,
      faBook,
      faMoneyBill,
      faHome,
      faUserGraduate,
      faQuoteLeft,
      faClipboardCheck,
      faUsersLine,
    );
  }
  ngOnInit(): void {
    this.loadFilieres();
    this.loadBourses();
  }
  loadFilieres(): void {
    this.filiereService.getAll().subscribe({
      next: (data: FiliereDTO[]) => {
        this.filieres = data;
      },
      error: (err: any) => console.error(err),
    });
  }
  loadBourses(): void {
    this.filiereService.getAllBourses().subscribe({
      next: (data: BourseConcoursDTO[]) => {
        this.boursesList = data;
        this.boursesListFiltrees = [...this.boursesList];
      },
      error: err => console.error('Erreur chargement bourses :', err),
    });
  }
  onSearchBourse(): void {
    const q = this.bourseSearchQuery.toLowerCase();
    this.boursesListFiltrees = this.boursesList.filter(
      b =>
        b.titre.toLowerCase().includes(q) ||
        (b.tags ?? []).some(t => t.toLowerCase().includes(q)) ||
        (b.type || '').toLowerCase().includes(q),
    );
  }

  // Filtre par type (Bourse / Concours)
  filterBourses(): void {
    this.boursesListFiltrees = this.boursesList.filter(b => !this.bourseSelectedType || b.type === this.bourseSelectedType);
  }

  // Affichage date format FR
  formatDateIso(d?: string): string {
    if (!d) return '';
    return new Date(d).toLocaleDateString('fr-FR');
  }

  // Voir détails d'une bourse (placeholder)
  voirDetailsBourse(b: BourseConcoursDTO): void {
    // TODO: ouvrir modal ou naviguer vers le détail
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filieres = this.filieres.filter(f => f.titre.toLowerCase().includes(query) || f.domaine.toLowerCase().includes(query));
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

  filterEcoles(): void {
    this.ecolesListFiltrees = this.ecolesList.filter(ec => {
      const passesType = !this.selectedType || ec.type === this.selectedType;
      const passesVille = !this.selectedVille || ec.ville === this.selectedVille;
      return passesType && passesVille;
    });
  }

  voirDetailsEcole(eco: Ecole): void {
    this.ecole = eco;
    this.showFiche = true; // <-- ici, utiliser showFiche
  }
  fermerPopup(): void {
    this.showFiche = false;
    this.ecole = null;
  }

  toggleFavori(e: Ecole): void {
    e.favori = !e.favori;
  }
  formatPrice(n: number): string {
    return n ? n.toLocaleString('fr-FR') : '';
  }
  formatSalaire(min?: number, max?: number): string {
    if (min && max) {
      return `${min.toLocaleString('fr-FR')} - ${max.toLocaleString('fr-FR')}`;
    } else if (min) {
      return min.toLocaleString('fr-FR');
    } else if (max) {
      return max.toLocaleString('fr-FR');
    }
    return '';
  }

  onFilter(): void {
    // Ajoute ta logique de filtre ici
  }

  openSite(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  openDetail(f: FiliereDTO): void {
    this.selectedFiliere = f;
  }

  closeDetail(): void {
    this.selectedFiliere = null;
  }
}
