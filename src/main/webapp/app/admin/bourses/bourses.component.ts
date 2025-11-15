import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Scholarship {
  id: number;
  titre: string;
  type: string;
  tags: string[];
  montant: string;
  periodicite: string;
  beneficiaires: number;
  tauxAcceptation: string;
  dateLimite: string;
  organisme: string;
  pays: string;
  criteres: string[];
  description: string;
  documentsRequis: string[];
}

const mockScholarships: Scholarship[] = [
  {
    id: 1,
    titre: "Bourse d'Excellence PAES",
    type: 'Bourse',
    tags: ['Licence', 'Master'],
    montant: '1,500,000 FCFA',
    periodicite: 'par an',
    beneficiaires: 245,
    tauxAcceptation: '25%',
    dateLimite: '15 Décembre 2024',
    organisme: "Ministère de l'Enseignement Supérieur",
    pays: 'Sénégal',
    criteres: [
      'Mention Bien ou Très Bien au Baccalauréat',
      'Être de nationalité sénégalaise',
      'Âge maximum : 25 ans',
      'Dossier académique excellent',
      "Projet d'études cohérent",
    ],
    description:
      "Programme de bourses d'excellence destiné aux meilleurs bacheliers sénégalais pour poursuivre leurs études supérieures au Sénégal.",
    documentsRequis: [
      'Copie certifiée du diplôme du baccalauréat',
      'Relevé de notes du baccalauréat',
      'Lettre de motivation (2 pages max)',
      'CV détaillé',
      "Copie de la carte d'identité nationale",
      'Certificat de scolarité',
    ],
  },
  {
    id: 2,
    titre: 'Campus France - Bourses Eiffel',
    type: 'Bourse',
    tags: ['Master', 'Doctorat'],
    montant: '€1,181',
    periodicite: 'par mois',
    beneficiaires: 532,
    tauxAcceptation: '15%',
    dateLimite: '30 Novembre 2024',
    organisme: 'Campus France',
    pays: 'France',
    criteres: [
      'Excellence académique',
      'Master ou Doctorat en France',
      'Moins de 30 ans (Master) ou 35 ans (Doctorat)',
      "Recommandation d'un établissement français",
      'Projet professionnel clair',
    ],
    description:
      "Bourse prestigieuse du gouvernement français pour attirer les meilleurs étudiants internationaux dans les établissements d'enseignement supérieur français.",
    documentsRequis: [
      'Formulaire de candidature Campus France',
      'Relevés de notes universitaires',
      'Lettres de recommandation (2)',
      'Lettre de motivation en français',
      'CV en français',
      "Projet d'études et professionnel",
    ],
  },
  {
    id: 3,
    titre: 'Concours ESP - Génie Civil',
    type: 'Concours',
    tags: ['Licence'],
    montant: 'Formation gratuite',
    periodicite: '5 ans',
    beneficiaires: 189,
    tauxAcceptation: '20%',
    dateLimite: '25 Octobre 2024',
    organisme: 'École Supérieure Polytechnique',
    pays: 'Sénégal',
    criteres: [
      'Baccalauréat série S ou T',
      'Moyenne minimale : 12/20',
      "Réussir le concours d'entrée",
      'Bonne condition physique',
      'Aptitude aux mathématiques et physique',
    ],
    description:
      "Concours d'entrée à l'ESP pour intégrer la filière Génie Civil, une des formations d'ingénieurs les plus prestigieuses du Sénégal.",
    documentsRequis: [
      "Dossier d'inscription au concours",
      'Copie du baccalauréat',
      'Relevés de notes (Première et Terminale)',
      'Certificat médical',
      "Photos d'identité (4)",
      'Frais de concours : 10,000 FCFA',
    ],
  },
  {
    id: 4,
    titre: 'Mastercard Foundation Scholars',
    type: 'Bourse',
    tags: ['Licence', 'Master'],
    montant: 'Couverture totale',
    periodicite: 'durée des études',
    beneficiaires: 1247,
    tauxAcceptation: '8%',
    dateLimite: '31 Décembre 2024',
    organisme: 'Mastercard Foundation',
    pays: 'Multi-pays',
    criteres: [
      'Étudiant africain talentueux',
      'Situation économique défavorable',
      'Leadership démontré',
      'Engagement communautaire',
      'Excellence académique',
    ],
    description: 'Programme de bourses complètes pour étudiants africains économiquement défavorisés mais académiquement talentueux.',
    documentsRequis: [
      'Formulaire en ligne complété',
      'Preuve de situation financière',
      'Lettres de recommandation (3)',
      'Essai personnel',
      'Relevés de notes',
      "Preuve d'engagement communautaire",
    ],
  },
  {
    id: 5,
    titre: 'Bourse Gouvernement Turc',
    type: 'Bourse',
    tags: ['Licence', 'Master', 'Doctorat'],
    montant: '700-1000 TRY',
    periodicite: 'par mois',
    beneficiaires: 423,
    tauxAcceptation: '30%',
    dateLimite: '20 Décembre 2024',
    organisme: 'YTB - Türkiye Scholarships',
    pays: 'Turquie',
    criteres: [
      'Moins de 21 ans (Licence), 30 ans (Master), 35 ans (Doctorat)',
      'Moyenne minimale selon le niveau',
      'Pas de bourse turque antérieure',
      'Bonne santé',
      'Engagement à retourner dans son pays',
    ],
    description:
      'Programme de bourses du gouvernement turc offrant une formation complète dans les universités turques avec cours de langue turque.',
    documentsRequis: [
      'Candidature en ligne sur le portail YTB',
      'Diplômes et relevés de notes',
      'Lettre de motivation',
      'Lettre de recommandation',
      'Passeport valide',
      'Photo récente',
    ],
  },
  {
    id: 6,
    titre: 'Concours Fonction Publique',
    type: 'Concours',
    tags: ['Licence', 'Master'],
    montant: 'Emploi garanti',
    periodicite: 'CDI',
    beneficiaires: 312,
    tauxAcceptation: '12%',
    dateLimite: '15 Novembre 2024',
    organisme: 'Ministère de la Fonction Publique',
    pays: 'Sénégal',
    criteres: [
      'Diplôme universitaire requis',
      'Nationalité sénégalaise',
      'Âge : 18-35 ans',
      'Casier judiciaire vierge',
      'Aptitude physique',
    ],
    description: 'Concours de recrutement dans la fonction publique sénégalaise pour divers corps et catégories de métiers.',
    documentsRequis: [
      "Formulaire d'inscription",
      'Copie diplôme certifiée',
      'Extrait de naissance',
      'Certificat de nationalité',
      'Casier judiciaire',
      'Certificat médical',
    ],
  },
];

@Component({
  selector: 'jhi-bourses',
  standalone: true,
  imports: [NgIf, FormsModule, NgForOf, NgClass],
  templateUrl: './bourses.component.html',
  styleUrl: './bourses.component.scss',
})
export default class BoursesComponent {
  searchTerm = '';
  filterType: 'all' | 'Bourse' | 'Concours' = 'all';
  scholarships: Scholarship[] = mockScholarships.slice(); // copy so we can modify
  selectedScholarship: Scholarship | null = null;
  notificationsCount = 3; // exemple

  get filteredScholarships(): Scholarship[] {
    const q = this.searchTerm.trim().toLowerCase();
    return this.scholarships.filter(s => {
      const matchesSearch =
        !q || s.titre.toLowerCase().includes(q) || s.organisme.toLowerCase().includes(q) || s.tags.join(' ').toLowerCase().includes(q);
      const matchesType = this.filterType === 'all' || s.type === this.filterType;
      return matchesSearch && matchesType;
    });
  }

  selectScholarship(s: Scholarship): void {
    this.selectedScholarship = s;
    // optionally scroll to top of modal or focus
  }

  closeDialog(): void {
    this.selectedScholarship = null;
  }

  addScholarship(): void {
    // placeholder behaviour — adapte pour ouvrir un formulaire réel
    // For now simply console log
    // console.info('Add scholarship - implement form/modal');
    alert("Ouvre le formulaire d'ajout (à implémenter).");
  }

  editScholarship(s: Scholarship): void {
    // console.info('Edit', s);
    alert(`Modifier: ${s.titre} (implémenter formulaire d'édition).`);
  }

  deleteScholarship(s: Scholarship): void {
    const ok = confirm(`Confirmer la suppression de "${s.titre}" ? Cette action est irréversible.`);
    if (!ok) return;
    this.scholarships = this.scholarships.filter(x => x.id !== s.id);
    if (this.selectedScholarship?.id === s.id) {
      this.closeDialog();
    }
  }

  applyNow(s: Scholarship | null): void {
    if (!s) return;
    // Placeholder: rediriger vers un lien / ouvrir formulaire
    alert(`Démarrer la candidature pour "${s.titre}" — implémenter le flux réel.`);
  }
}
