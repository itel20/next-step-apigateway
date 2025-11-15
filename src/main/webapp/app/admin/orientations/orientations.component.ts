import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarChartModule, PieChartModule } from '@swimlane/ngx-charts';

interface Formation {
  nom: string;
  note: number;
}
interface Temoignage {
  nom: string;
  role: string;
  texte: string;
}
interface Orientation {
  id: number;
  titre: string;
  categorie: string;
  difficulte: string;
  tauxEmploi: string;
  satisfaction: string;
  salaireMoyen: string;
  dureeFormation: string;
  formations: Formation[];
  debouches: string[];
  competences: string[];
  temoignage: Temoignage;
}

@Component({
  selector: 'jhi-orientations',
  standalone: true,
  imports: [NgClass, FormsModule, BarChartModule, PieChartModule, NgForOf, NgIf],
  templateUrl: './orientations.component.html',
  styleUrl: './orientations.component.scss',
})
export default class OrientationsComponent {
  alert = alert;
  searchTerm = '';
  selectedOrientation: Orientation | null = null;

  // données (mock) — intégrées directement ici
  orientations: Orientation[] = [
    {
      id: 1,
      titre: 'Ingénieur en Informatique',
      categorie: 'Technologie',
      difficulte: 'Élevée',
      tauxEmploi: '95%',
      satisfaction: '4.8/5',
      salaireMoyen: '650,000 FCFA',
      dureeFormation: '5 ans',
      formations: [
        { nom: 'ESP Dakar - Génie Informatique', note: 4.7 },
        { nom: 'UCAD - Licence Informatique', note: 4.3 },
        { nom: 'UGB - Master Informatique', note: 4.5 },
        { nom: 'HECI - Ingénierie Logicielle', note: 4.4 },
      ],
      debouches: [
        'Développeur Full-Stack',
        'Architecte Logiciel',
        'Data Scientist',
        'Chef de projet IT',
        'Consultant Tech',
        'DevOps Engineer',
      ],
      competences: [
        'Programmation (Python, Java, JavaScript)',
        'Bases de données',
        'Architecture logicielle',
        'Cloud Computing',
        'Gestion de projet',
        'Intelligence Artificielle',
      ],
      temoignage: {
        nom: 'Moussa Diallo',
        role: 'Ingénieur Logiciel chez Orange',
        texte:
          "Après ma formation en génie informatique, j'ai rapidement trouvé un emploi. Le secteur est en pleine expansion au Sénégal et les opportunités sont nombreuses.",
      },
    },
    {
      id: 2,
      titre: 'Médecin Généraliste',
      categorie: 'Santé',
      difficulte: 'Très élevée',
      tauxEmploi: '98%',
      satisfaction: '4.9/5',
      salaireMoyen: '800,000 FCFA',
      dureeFormation: '7 ans',
      formations: [
        { nom: 'UCAD - Faculté de Médecine', note: 4.8 },
        { nom: 'UGB - Médecine', note: 4.5 },
        { nom: 'UASZ - Sciences de la Santé', note: 4.2 },
      ],
      debouches: [
        'Médecin généraliste',
        'Médecin spécialiste',
        'Chirurgien',
        'Chef de service hospitalier',
        'Médecin humanitaire',
        'Chercheur en médecine',
      ],
      competences: ['Diagnostic médical', 'Anatomie et physiologie', 'Pharmacologie', 'Chirurgie', 'Relation patient', 'Éthique médicale'],
      temoignage: {
        nom: 'Dr. Fatou Sarr',
        role: "Médecin à l'Hôpital Principal",
        texte: "La médecine est exigeante mais gratifiante. Chaque jour, on aide des patients et on sauve des vies. C'est une vocation.",
      },
    },
    {
      id: 3,
      titre: 'Expert en Marketing Digital',
      categorie: 'Commerce & Marketing',
      difficulte: 'Moyenne',
      tauxEmploi: '88%',
      satisfaction: '4.5/5',
      salaireMoyen: '500,000 FCFA',
      dureeFormation: '3-5 ans',
      formations: [
        { nom: 'IAM - Master Marketing Digital', note: 4.6 },
        { nom: 'UCAD - Licence Marketing', note: 4.2 },
        { nom: 'ISM - Communication Digitale', note: 4.4 },
        { nom: 'HECI - Marketing & Communication', note: 4.3 },
      ],
      debouches: [
        'Community Manager',
        'Traffic Manager',
        'Social Media Manager',
        'SEO/SEM Specialist',
        'Content Manager',
        'Chef de projet digital',
      ],
      competences: ['Réseaux sociaux', 'SEO/SEA', 'Analytics & Data', 'Content Marketing', 'Email Marketing', 'Stratégie digitale'],
      temoignage: {
        nom: 'Aïssatou Ndiaye',
        role: 'Digital Marketing Manager',
        texte:
          "Le marketing digital évolue constamment. C'est un domaine passionnant qui offre beaucoup de créativité et d'opportunités professionnelles.",
      },
    },
    {
      id: 4,
      titre: 'Avocat / Juriste',
      categorie: 'Droit & Justice',
      difficulte: 'Élevée',
      tauxEmploi: '82%',
      satisfaction: '4.6/5',
      salaireMoyen: '600,000 FCFA',
      dureeFormation: '5-6 ans',
      formations: [
        { nom: 'UCAD - Faculté de Droit', note: 4.7 },
        { nom: 'UGB - Droit des Affaires', note: 4.4 },
        { nom: 'UADB - Sciences Juridiques', note: 4.2 },
      ],
      debouches: ["Avocat d'affaires", "Juriste d'entreprise", 'Magistrat', 'Notaire', 'Conseiller juridique', 'Avocat pénaliste'],
      competences: [
        'Droit civil et pénal',
        'Procédure judiciaire',
        'Plaidoirie',
        'Rédaction juridique',
        'Négociation',
        'Droit des affaires',
      ],
      temoignage: {
        nom: 'Me Cheikh Sow',
        role: 'Avocat au Barreau de Dakar',
        texte: "Le métier d'avocat demande rigueur et passion pour la justice. C'est un parcours exigeant mais très enrichissant.",
      },
    },
    {
      id: 5,
      titre: 'Ingénieur Civil',
      categorie: 'Génie Civil & BTP',
      difficulte: 'Élevée',
      tauxEmploi: '91%',
      satisfaction: '4.7/5',
      salaireMoyen: '700,000 FCFA',
      dureeFormation: '5 ans',
      formations: [
        { nom: 'ESP - Génie Civil', note: 4.8 },
        { nom: 'UCAD - Licence Génie Civil', note: 4.3 },
        { nom: 'Polytechnique Thiès', note: 4.5 },
      ],
      debouches: [
        'Ingénieur de chantier',
        'Conducteur de travaux',
        'Chef de projet BTP',
        "Bureau d'études",
        'Expert en structures',
        'Ingénieur conseil',
      ],
      competences: [
        'Calcul de structures',
        'Plans et dessins techniques',
        'Gestion de chantier',
        'Matériaux de construction',
        'Normes et réglementations',
        'Logiciels CAO/DAO',
      ],
      temoignage: {
        nom: 'Ibrahima Kane',
        role: 'Ingénieur Civil chez EIFFAGE',
        texte:
          "Le génie civil participe au développement du pays. Voir les infrastructures qu'on a conçues prendre vie est une grande satisfaction.",
      },
    },
    {
      id: 6,
      titre: 'Expert Comptable',
      categorie: 'Finance & Comptabilité',
      difficulte: 'Élevée',
      tauxEmploi: '86%',
      satisfaction: '4.4/5',
      salaireMoyen: '550,000 FCFA',
      dureeFormation: '5 ans',
      formations: [
        { nom: 'UCAD - Sciences de Gestion', note: 4.5 },
        { nom: 'IAM - Comptabilité & Finance', note: 4.6 },
        { nom: 'ISM - Expertise Comptable', note: 4.3 },
      ],
      debouches: [
        'Expert-comptable',
        'Auditeur financier',
        'Contrôleur de gestion',
        'Directeur financier',
        'Consultant fiscal',
        'Commissaire aux comptes',
      ],
      competences: [
        'Comptabilité générale',
        'Audit et contrôle',
        'Fiscalité',
        'Analyse financière',
        'Normes comptables',
        'Logiciels comptables',
      ],
      temoignage: {
        nom: 'Aminata Fall',
        role: 'Expert-Comptable',
        texte:
          "L'expertise comptable est un métier de confiance. On accompagne les entreprises dans leur gestion financière et leur développement.",
      },
    },
  ];

  // getter filtré
  get filteredOrientations(): Orientation[] {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) return this.orientations;
    return this.orientations.filter(o => o.titre.toLowerCase().includes(q) || o.categorie.toLowerCase().includes(q));
  }

  // ouvre modal détails
  openDetails(item: Orientation): void {
    this.selectedOrientation = item;
    // scroll top or focus optional
    setTimeout(() => {
      const el = document.querySelector('.modal-content');
      if (el) el.scrollTop = 0;
    }, 0);
  }

  // ferme modal
  closeDetails(): void {
    this.selectedOrientation = null;
  }

  // delete avec confirmation
  deleteOrientation(item: Orientation): void {
    const ok = confirm(`Confirmer la suppression de "${item.titre}" ? Cette action est irréversible.`);
    if (!ok) return;
    this.orientations = this.orientations.filter(o => o.id !== item.id);
    if (this.selectedOrientation?.id === item.id) this.closeDetails();
  }

  // placeholder edit
  editOrientation(item: Orientation): void {
    alert(`Ouvrir l'édition pour : ${item.titre}  (à implémenter)`);
  }

  // utilitaire initiales
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  // badge couleur selon difficulté (class name)
  difficultyClass(d: string): string {
    switch (d) {
      case 'Très élevée':
        return 'diff-very-high';
      case 'Élevée':
        return 'diff-high';
      case 'Moyenne':
        return 'diff-medium';
      default:
        return 'diff-low';
    }
  }
}
