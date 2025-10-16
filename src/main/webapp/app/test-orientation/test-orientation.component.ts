import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-test-orientation',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './test-orientation.component.html',
  styleUrls: ['./test-orientation.component.scss'],
})
export class TestOrientationComponent {
  selectedClass = '';
  otherClass = '';
  searchQuery = '';
  faBullseye = faBullseye;

  step = 1;
  maxStep = 6;

  // ✅ Étape 1 — Parcours scolaire
  parcoursQuestions = [
    {
      label: 'Dans quelle classe es-tu actuellement ?',
      options: ['Seconde', 'Première', 'Terminale', 'Bac +1 ou plus'],
      model: 'class',
    },
    {
      label: 'Quelle est ta filière actuelle ?',
      options: ['S (Scientifique)', 'L (Littéraire)', 'ES (Économique et Social)', 'STMG', 'Bac Pro'],
      model: 'filiere',
    },
  ];

  // ✅ Étape 2 — Passions
  passionsQuestions = [
    {
      label: 'Quelles activités fais-tu par plaisir pendant ton temps libre ?',
      options: [
        'Coder / Créer sur ordinateur',
        'Lire / Écrire',
        'Dessin / Musique',
        'Sport / Danse',
        'Aider les autres',
        'Entreprendre des projets',
      ],
      model: 'activites',
    },
    {
      label: 'Quel type de projet t’attire le plus ?',
      options: [
        'Créer une entreprise',
        'Faire des recherches',
        'Travailler dans l’art',
        'Transmettre et enseigner',
        'Résoudre des problèmes concrets',
      ],
      model: 'typeProjet',
    },
  ];

  // ✅ Étape 3 — Comportements et attitude
  comportementQuestions = [
    {
      label: 'En groupe, tu es plutôt celui/celle qui...',
      options: [
        'Prend les décisions',
        'Apporte des idées créatives',
        'Organise et planifie',
        'Aide les autres à comprendre',
        'Observe et analyse',
      ],
      model: 'roleGroupe',
    },
    {
      label: 'Face à un problème difficile, tu...',
      options: [
        'Persévères jusqu’à trouver une solution',
        'Cherches de l’aide',
        'Cherches une approche originale',
        'Analyses calmement toutes les options',
      ],
      model: 'attitudeProbleme',
    },
  ];

  // ✅ Étape 4 — Aspirations et valeurs
  aspirationsQuestions = [
    {
      label: 'Qu’est-ce qui compte le plus pour toi dans ton futur métier ?',
      options: [
        'Gagner bien ma vie',
        'Aider les autres',
        'Être libre et créatif(ve)',
        'Voyager / Découvrir',
        'Avoir un poste de responsabilité',
      ],
      model: 'valeurMetier',
    },
    {
      label: 'Comment imagines-tu ton futur environnement de travail ?',
      options: [
        'Un bureau calme',
        'Un laboratoire / atelier',
        'En extérieur',
        'Avec du contact humain',
        'À mon compte (freelance / entrepreneur)',
      ],
      model: 'environnement',
    },
  ];

  // ✅ Étape 5 — Aptitudes / compétences
  aptitudesQuestions = [
    {
      label: 'Dans quelle mesure te sens-tu à l’aise avec ces domaines ?',
      subQuestions: [
        { skill: 'Raisonnement logique et mathématique', model: 'math', scale: [1, 2, 3, 4] },
        { skill: 'Expression écrite et orale', model: 'langue', scale: [1, 2, 3, 4] },
        { skill: 'Créativité et imagination', model: 'creativite', scale: [1, 2, 3, 4] },
        { skill: 'Leadership et communication', model: 'leadership', scale: [1, 2, 3, 4] },
        { skill: 'Sens de l’observation et rigueur', model: 'rigueur', scale: [1, 2, 3, 4] },
      ],
    },
  ];

  // ✅ Étape 6 — Résumé
  answers: any = {};

  async nextStep(): Promise<void> {
    if (this.isStepValid()) {
      if (this.step < this.maxStep) {
        this.step++;
      } else {
        const SwalModule = await import('sweetalert2');
        SwalModule.default.fire({
          title: 'Merci !',
          text: 'Ton profil sera généré prochainement.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    }
  }

  prevStep(): void {
    if (this.step > 1) this.step--;
  }

  /** Vérifie si toutes les questions de l’étape courante ont été remplies */
  isStepValid(): boolean {
    let questions: any[] = [];
    switch (this.step) {
      case 1:
        questions = this.parcoursQuestions;
        break;
      case 2:
        questions = this.passionsQuestions;
        break;
      case 3:
        questions = this.comportementQuestions;
        break;
      case 4:
        questions = this.aspirationsQuestions;
        break;
      case 5:
        questions = this.aptitudesQuestions[0].subQuestions;
        break;
    }

    return questions.every(q => {
      const answer = this.answers[q.model];
      // Si c’est un tableau (multi-sélection)
      if (Array.isArray(answer)) return answer.length > 0;
      // Si c’est une valeur simple (note, choix unique)
      return answer !== undefined && answer !== null && answer !== '';
    });
  }

  onSubmit(): void {
    const selected = this.selectedClass === 'Autre' ? this.otherClass : this.selectedClass;
    alert(`Classe sélectionnée : ${selected}`); // option simple pour tester
  }
  onSearch(): void {
    // TODO: implémentation future
  }
  // Ajoute cette méthode dans ton composant
  onCheckboxChange(event: any, model: string): void {
    if (!this.answers[model]) {
      this.answers[model] = [];
    }
    const value = event.target.value;
    if (event.target.checked) {
      // Ajouter la valeur si cochée
      this.answers[model].push(value);
    } else {
      // Retirer la valeur si décochée
      this.answers[model] = this.answers[model].filter((v: string) => v !== value);
    }
  }
  // Sélection unique
  selectOption(model: string, value: any): void {
    this.answers[model] = value;
  }

  // Sélection multiple (cases à cocher stylisées)
  toggleOption(model: string, value: any): void {
    if (!this.answers[model]) {
      this.answers[model] = [];
    }
    const index = this.answers[model].indexOf(value);
    if (index > -1) {
      this.answers[model].splice(index, 1);
    } else {
      this.answers[model].push(value);
    }
  }
}
