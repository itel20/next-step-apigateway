import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';

interface Question {
  model: string;
  label: string;
  options: string[];
  subQuestions?: { skill: string; model: string; scale: number[] }[];
}

type Answers = Record<string, string | string[] | number | undefined>;

@Component({
  standalone: true,
  selector: 'jhi-test-orientation',
  imports: [NgForOf, NgIf],
  templateUrl: './test-orientation.component.html',
  styleUrls: ['./test-orientation.component.scss'],
})
export class TestOrientationComponent {
  step = 1;
  maxStep = 6;
  answers: Answers = {};
  isAnalyzing = false;
  showResults = false;
  analysisStep = 0;

  parcoursQuestions: Question[] = [
    {
      model: 'niveau',
      label: 'Quel est ton niveau actuel ?',
      options: ['Seconde', 'Première', 'Terminale', 'Bac+1', 'Bac+2', 'Autre'],
    },
    {
      model: 'specialite',
      label: 'Quelle spécialité te plaît le plus ?',
      options: ['Sciences', 'Littérature', 'Économie', 'Arts', 'Technologies', 'Langues'],
    },
  ];

  passionsQuestions: Question[] = [
    {
      model: 'passions',
      label: 'Quelles sont tes passions ? (plusieurs choix possibles)',
      options: ['Sport', 'Art', 'Technologie', 'Nature', 'Lecture', 'Musique', 'Voyage', 'Sciences'],
    },
  ];

  comportementQuestions: Question[] = [
    {
      model: 'travailGroupe',
      label: 'Préfères-tu travailler seul ou en groupe ?',
      options: ['Seul', 'En groupe', 'Les deux'],
    },
    {
      model: 'typeActivite',
      label: "Quel type d'activité préfères-tu ?",
      options: ['Activités pratiques', 'Activités intellectuelles', 'Activités créatives', 'Activités relationnelles'],
    },
  ];

  aspirationsQuestions: Question[] = [
    {
      model: 'valeurs',
      label: 'Quelle valeur est la plus importante pour toi ?',
      options: ['Créativité', 'Stabilité', 'Innovation', 'Aider les autres', 'Indépendance', 'Prestige'],
    },
    {
      model: 'environnement',
      label: 'Dans quel environnement aimerais-tu travailler ?',
      options: ['Bureau', 'Extérieur', 'Laboratoire', 'À domicile', 'En déplacement'],
    },
  ];

  aptitudesQuestions: Question[] = [
    {
      model: 'competences',
      label: 'Évalue tes compétences (1 = Faible, 5 = Excellent)',
      options: [],
      subQuestions: [
        { skill: 'Communication', model: 'comm', scale: [1, 2, 3, 4, 5] },
        { skill: 'Analyse', model: 'analyse', scale: [1, 2, 3, 4, 5] },
        { skill: 'Créativité', model: 'creativite', scale: [1, 2, 3, 4, 5] },
        { skill: 'Organisation', model: 'organisation', scale: [1, 2, 3, 4, 5] },
      ],
    },
  ];

  stepTitles = [
    { title: 'Parcours scolaire', icon: 'bi bi-book' },
    { title: 'Passions', icon: 'bi bi-heart-fill' },
    { title: 'Comportements', icon: 'bi bi-bullseye' },
    { title: 'Aspirations', icon: 'bi bi-stars' },
    { title: 'Compétences', icon: 'bi bi-lightning-charge-fill' },
    { title: 'Résumé', icon: 'bi bi-bar-chart-line-fill' },
  ];

  analysisSteps = [
    'Analyse de ton parcours scolaire...',
    'Évaluation de tes passions...',
    'Analyse de tes aspirations...',
    'Calcul de compatibilité...',
    'Génération des recommandations...',
  ];

  selectOption(model: string, option: string | number): void {
    this.answers[model] = option;
  }

  toggleOption(model: string, option: string): void {
    if (!Array.isArray(this.answers[model])) {
      this.answers[model] = [];
    }

    const list = this.answers[model]; // plus besoin de 'as string[]'

    if (list.includes(option)) {
      this.answers[model] = list.filter(o => o !== option);
    } else {
      this.answers[model] = [...list, option];
    }
  }

  isStepValid(): boolean {
    const ans = this.answers;
    if (this.step === 1) return !!ans.niveau && !!ans.specialite;
    if (this.step === 2) return Array.isArray(ans.passions) && ans.passions.length > 0;
    if (this.step === 3) return !!ans.travailGroupe && !!ans.typeActivite;
    if (this.step === 4) return !!ans.valeurs && !!ans.environnement;
    if (this.step === 5) return !!ans.comm && !!ans.analyse && !!ans.creativite && !!ans.organisation;
    return true;
  }

  nextStep(): void {
    if (this.step < this.maxStep) {
      this.step++;
    } else if (this.step === this.maxStep) {
      this.launchAnalysis();
    }
  }

  prevStep(): void {
    if (this.step > 1) this.step--;
  }

  launchAnalysis(): void {
    this.isAnalyzing = true;
    let index = 0;
    const interval = setInterval(() => {
      this.analysisStep = index;
      index++;
      if (index === this.analysisSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          this.isAnalyzing = false;
          this.showResults = true;
        }, 500);
      }
    }, 1000);
  }

  getAnswerString(key: string): string {
    const val = this.answers[key];
    if (Array.isArray(val)) return val.join(', ');
    if (val != null) return val.toString();
    return '-';
  }

  getRecommendations(): { title: string; match: number; paths: string[] }[] {
    const ans = this.answers as any;
    const rec: { title: string; match: number; paths: string[] }[] = [];

    if (ans.specialite === 'Sciences' || ans.specialite === 'Technologies') {
      rec.push({
        title: 'Ingénierie & Technologies',
        match: 95,
        paths: ['École d’ingénieurs', 'Informatique', 'Robotique'],
      });
    }

    if (Array.isArray(ans.passions) && ans.passions.includes('Art')) {
      rec.push({
        title: 'Arts & Création',
        match: 88,
        paths: ['Design', 'Architecture', 'Audiovisuel'],
      });
    }

    if (ans.specialite === 'Économie' || ans.valeurs === 'Prestige') {
      rec.push({
        title: 'Commerce & Management',
        match: 92,
        paths: ['Marketing', 'Finance', 'Entrepreneuriat'],
      });
    }

    return rec.sort((a, b) => b.match - a.match).slice(0, 3);
  }

  goToSettings(): void {
    // console.log('Redirection vers settings_screen');
    // this.router.navigate(['/settings_screen']);
  }

  isOptionSelected(model: string, option: string): boolean {
    const value = this.answers[model];
    return Array.isArray(value) ? value.includes(option) : false;
  }
}
