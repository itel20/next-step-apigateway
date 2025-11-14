import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Admission {
  campusen: boolean;
  dossier: boolean;
  concours: boolean;
  tauxAcceptation: string;
  pointsBAC: string;
}

export interface Institution {
  id: number;
  nom: string;
  type: 'Public' | 'Privé';
  ville: string;
  pays: string;
  classement: string;
  note: number;
  nbAvis: number;
  selectivite: string;
  international: string;
  fraisAn: string;
  filieres: string[];
  description: string;
  etudiants: number;
  enseignants: number;
  laboratoires: number;
  bibliotheques: number;
  tauxInsertion: string;
  salairesMoyen: string;
  admission: Admission;
  infrastructures: string[];
  associations: string[];
}

@Component({
  selector: 'jhi-etablissements',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, NgClass],
  templateUrl: './etablissements.component.html',
  styleUrls: ['./etablissements.component.scss'],
})
export default class EtablissementsComponent {
  // filtres
  searchTerm = '';
  filterType: 'all' | 'Public' | 'Privé' = 'all';
  filterVille = 'all';

  // modales / sélection
  selectedInstitution: Institution | null = null;
  showDeleteConfirm = false;
  institutionToDelete: Institution | null = null;

  // données complètes
  mockInstitutions: Institution[] = [
    {
      id: 1,
      nom: 'Université Cheikh Anta Diop (UCAD)',
      type: 'Public',
      ville: 'Dakar',
      pays: 'Sénégal',
      classement: '1ère',
      note: 4.5,
      nbAvis: 234,
      selectivite: '75%',
      international: '12%',
      fraisAn: '50,000 FCFA',
      filieres: ['Médecine', 'Droit', 'Informatique', 'Économie', 'Lettres Modernes', 'Sciences Physiques'],
      description:
        "Plus grande université du Sénégal, l'UCAD est un établissement d'enseignement supérieur de référence en Afrique de l'Ouest.",
      etudiants: 85000,
      enseignants: 1200,
      laboratoires: 45,
      bibliotheques: 12,
      tauxInsertion: '78%',
      salairesMoyen: '450,000 FCFA',
      admission: {
        campusen: true,
        dossier: true,
        concours: false,
        tauxAcceptation: '65%',
        pointsBAC: '12+',
      },
      infrastructures: ['Bibliothèque centrale', 'Campus numérique', 'Centre sportif', 'Résidences universitaires'],
      associations: ['AEMS', 'Club scientifique', 'Association culturelle'],
    },
    {
      id: 2,
      nom: 'École Supérieure Polytechnique (ESP)',
      type: 'Public',
      ville: 'Dakar',
      pays: 'Sénégal',
      classement: 'Top 3',
      note: 4.7,
      nbAvis: 156,
      selectivite: '85%',
      international: '8%',
      fraisAn: '75,000 FCFA',
      filieres: ['Génie Civil', 'Génie Informatique', 'Génie Électrique', 'Génie Mécanique', 'Génie Chimique'],
      description: "École d'ingénieurs de référence formant des professionnels hautement qualifiés dans divers domaines techniques.",
      etudiants: 3500,
      enseignants: 280,
      laboratoires: 18,
      bibliotheques: 3,
      tauxInsertion: '92%',
      salairesMoyen: '650,000 FCFA',
      admission: {
        campusen: true,
        dossier: true,
        concours: true,
        tauxAcceptation: '25%',
        pointsBAC: '14+',
      },
      infrastructures: ['Laboratoires modernes', "Incubateur d'entreprises", 'Centre de recherche', 'Résidence'],
      associations: ['Club robotique', 'IEEE Student Branch', 'Club entrepreneuriat'],
    },
    {
      id: 3,
      nom: 'Université Gaston Berger (UGB)',
      type: 'Public',
      ville: 'Saint-Louis',
      pays: 'Sénégal',
      classement: '2ème',
      note: 4.3,
      nbAvis: 189,
      selectivite: '70%',
      international: '15%',
      fraisAn: '45,000 FCFA',
      filieres: ['Mathématiques', 'Physique', 'Lettres', 'Sciences Économiques', 'Informatique', 'Droit'],
      description: "Université reconnue pour l'excellence de ses formations en sciences et lettres.",
      etudiants: 18000,
      enseignants: 450,
      laboratoires: 22,
      bibliotheques: 5,
      tauxInsertion: '75%',
      salairesMoyen: '420,000 FCFA',
      admission: {
        campusen: true,
        dossier: true,
        concours: false,
        tauxAcceptation: '60%',
        pointsBAC: '11+',
      },
      infrastructures: ['Campus moderne', 'Bibliothèque numérique', 'Stade', 'Cité universitaire'],
      associations: ['Association des étudiants', 'Club scientifique UGB', 'Club culturel'],
    },
    {
      id: 4,
      nom: 'Institut Africain de Management (IAM)',
      type: 'Privé',
      ville: 'Dakar',
      pays: 'Sénégal',
      classement: 'Top 5',
      note: 4.4,
      nbAvis: 98,
      selectivite: '60%',
      international: '20%',
      fraisAn: '1,500,000 FCFA',
      filieres: ['Management', 'Marketing', 'Finance', 'Ressources Humaines', 'Commerce International'],
      description: "École de management privée reconnue pour la qualité de ses formations en gestion d'entreprise.",
      etudiants: 2500,
      enseignants: 120,
      laboratoires: 5,
      bibliotheques: 2,
      tauxInsertion: '85%',
      salairesMoyen: '550,000 FCFA',
      admission: {
        campusen: false,
        dossier: true,
        concours: true,
        tauxAcceptation: '45%',
        pointsBAC: '12+',
      },
      infrastructures: ['Campus moderne', 'Salle de conférence', 'Incubateur', 'Centre de langues'],
      associations: ['Junior Entreprise', 'Club entrepreneuriat', 'Association des anciens'],
    },
    {
      id: 5,
      nom: 'Groupe HECI Polytechnique',
      type: 'Privé',
      ville: 'Dakar',
      pays: 'Sénégal',
      classement: 'Top 10',
      note: 4.2,
      nbAvis: 124,
      selectivite: '55%',
      international: '18%',
      fraisAn: '1,200,000 FCFA',
      filieres: ['Informatique', 'Télécommunications', 'Gestion', 'Marketing Digital', 'Architecture'],
      description: "Groupe d'écoles privées offrant des formations techniques et managériales de qualité.",
      etudiants: 4200,
      enseignants: 180,
      laboratoires: 12,
      bibliotheques: 4,
      tauxInsertion: '80%',
      salairesMoyen: '500,000 FCFA',
      admission: {
        campusen: false,
        dossier: true,
        concours: false,
        tauxAcceptation: '50%',
        pointsBAC: '11+',
      },
      infrastructures: ['Campus numérique', 'Laboratoires IT', 'Espaces de coworking', 'Résidence'],
      associations: ['Club tech', 'Club innovation', 'Association étudiante'],
    },
    {
      id: 6,
      nom: 'Université Alioune Diop de Bambey',
      type: 'Public',
      ville: 'Bambey',
      pays: 'Sénégal',
      classement: 'Top 8',
      note: 4.0,
      nbAvis: 87,
      selectivite: '68%',
      international: '10%',
      fraisAn: '40,000 FCFA',
      filieres: ['Agronomie', "Sciences de l'Éducation", 'Lettres', 'Sciences Sociales', 'Informatique'],
      description: "Université publique spécialisée dans l'agriculture et les sciences de l'éducation.",
      etudiants: 12000,
      enseignants: 320,
      laboratoires: 15,
      bibliotheques: 4,
      tauxInsertion: '71%',
      salairesMoyen: '380,000 FCFA',
      admission: {
        campusen: true,
        dossier: true,
        concours: false,
        tauxAcceptation: '62%',
        pointsBAC: '10+',
      },
      infrastructures: ['Campus agricole', 'Bibliothèque', 'Ferme pédagogique', 'Cité U'],
      associations: ['Club agronomie', 'Association culturelle', 'Club sportif'],
    },
  ];

  // getter filtré
  get filteredInstitutions(): Institution[] {
    return this.mockInstitutions.filter((inst: Institution) => {
      const matchesSearch = inst.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.filterType === 'all' || inst.type === this.filterType;
      const matchesVille = this.filterVille === 'all' || inst.ville === this.filterVille;
      return matchesSearch && matchesType && matchesVille;
    });
  }

  // ouvrir modal détails
  openDetails(inst: Institution): void {
    this.selectedInstitution = inst;
    setTimeout(() => {
      const el = document.querySelector('.modal-content');
      if (el) (el as HTMLElement).scrollTop = 0;
    }, 10);
  }

  closeDetails(): void {
    this.selectedInstitution = null;
  }

  // suppression
  openDelete(inst: Institution): void {
    this.institutionToDelete = inst;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.institutionToDelete = null;
    this.showDeleteConfirm = false;
  }

  confirmDelete(): void {
    if (!this.institutionToDelete) return;
    this.mockInstitutions = this.mockInstitutions.filter(i => i.id !== this.institutionToDelete!.id);

    // fermer modales si nécessaires
    if (this.selectedInstitution?.id === this.institutionToDelete.id) {
      this.closeDetails();
    }

    this.institutionToDelete = null;
    this.showDeleteConfirm = false;
  }

  // placeholders actions
  addInstitution(): void {
    alert('Ajouter un établissement (placeholder)');
  }

  editInstitution(inst: Institution): void {
    alert(`Éditer ${inst.nom} (placeholder)`);
  }
}
