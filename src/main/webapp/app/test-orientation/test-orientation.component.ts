import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

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

  /** PROGRESS BAR **/
  progress = 0; // ⬅️ Ajout
  analysisProgress = 0;

  answers: Answers = {};
  isAnalyzing = false;
  showResults = false;
  analysisStep = 0;

  /* ----------------------
      QUESTIONS
  -----------------------*/
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

  /* ----------------------
      TITRES DES ÉTAPES
  -----------------------*/
  stepTitles = [
    { title: 'Parcours scolaire', icon: 'bi bi-book' },
    { title: 'Passions', icon: 'bi bi-heart-fill' },
    { title: 'Comportements', icon: 'bi bi-bullseye' },
    { title: 'Aspirations', icon: 'bi bi-stars' },
    { title: 'Compétences', icon: 'bi bi-lightning-charge-fill' },
    { title: 'Résumé', icon: 'bi bi-bar-chart-line-fill' },
  ];

  /* ----------------------
      TEXTE ANALYSE
  -----------------------*/
  analysisSteps = [
    'Analyse de ton parcours scolaire...',
    'Évaluation de tes passions...',
    'Analyse de tes aspirations...',
    'Calcul de compatibilité...',
    'Génération des recommandations...',
  ];

  /* ----------------------
      MÉTHODES SÉLECTION
  -----------------------*/
  selectOption(model: string, option: string | number): void {
    this.answers[model] = option;
  }

  toggleOption(model: string, option: string): void {
    if (!Array.isArray(this.answers[model])) {
      this.answers[model] = [];
    }

    const list = this.answers[model];
    this.answers[model] = list.includes(option) ? list.filter(o => o !== option) : [...list, option];
  }

  isOptionSelected(model: string, option: string): boolean {
    const value = this.answers[model];
    return Array.isArray(value) ? value.includes(option) : false;
  }

  /* ----------------------
      VALIDATION ÉTAPES
  -----------------------*/
  isStepValid(): boolean {
    const a = this.answers;

    if (this.step === 1) return !!a.niveau && !!a.specialite;
    if (this.step === 2) return Array.isArray(a.passions) && a.passions.length > 0;
    if (this.step === 3) return !!a.travailGroupe && !!a.typeActivite;
    if (this.step === 4) return !!a.valeurs && !!a.environnement;
    if (this.step === 5) return !!a.comm && !!a.analyse && !!a.creativite && !!a.organisation;

    return true;
  }

  /* ----------------------
      NAVIGATION
  -----------------------*/
  nextStep(): void {
    if (!this.isStepValid()) return;

    if (this.step < this.maxStep) {
      this.step++;
      this.updateProgress();
    } else {
      this.launchAnalysis();
    }
  }

  prevStep(): void {
    if (this.step > 1) {
      this.step--;
      this.updateProgress();
    }
  }

  /** ⬅️ AJOUT : Aller directement à une étape (pour clic sur le panneau latéral) */
  goTo(step: number): void {
    if (step >= 1 && step <= this.maxStep) {
      this.step = step;
      this.updateProgress();
    }
  }

  /** ⬅️ AJOUT : Progression en fonction de l'étape */
  updateProgress(): void {
    this.progress = ((this.step - 1) / (this.maxStep - 1)) * 100;
  }

  /* ----------------------
      PHASE ANALYSE
  -----------------------*/
  launchAnalysis(): void {
    this.isAnalyzing = true;
    this.analysisProgress = 0;

    let index = 0;

    const interval = setInterval(() => {
      this.analysisStep = index;
      this.analysisProgress = ((index + 1) / this.analysisSteps.length) * 100;

      index++;
      if (index === this.analysisSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          this.isAnalyzing = false;
          this.showResults = true;
        }, 500);
      }
    }, 900);
  }

  /* ----------------------
      UTILITAIRES
  -----------------------*/
  getAnswerString(key: string): string {
    const val = this.answers[key];
    if (Array.isArray(val)) return val.join(', ');
    return val !== undefined ? String(val) : '-';
  }

  /* ----------------------
   RECOMMANDATIONS
-----------------------*/
  getRecommendations(): { title: string; match: number; paths: string[] }[] {
    const ans = this.answers as any;
    const rec: { title: string; match: number; paths: string[] }[] = [];

    /* -------------------------------------------------
       SCIENCES / TECHNOLOGIES
    --------------------------------------------------*/
    if (['Sciences', 'Technologies'].includes(ans.specialite)) {
      rec.push({
        title: 'Ingénierie & Technologies',
        match: 95,
        paths: ['École d’ingénieurs', 'Informatique', 'Robotique', 'IA & Data', 'Cybersécurité'],
      });
    }

    if (Array.isArray(ans.passions) && ans.passions.includes('Technologie')) {
      rec.push({
        title: 'Numérique & Développement',
        match: 88,
        paths: ['Développement Web', 'Applications mobiles', 'Jeux vidéo', 'Cloud & DevOps'],
      });
    }

    /* -------------------------------------------------
       ARTS / CRÉATION
    --------------------------------------------------*/
    if (Array.isArray(ans.passions) && ans.passions.includes('Art')) {
      rec.push({
        title: 'Arts & Création',
        match: 92,
        paths: ['Design graphique', 'Architecture', 'Audiovisuel', 'Animation 3D', 'Photographie'],
      });
    }

    if (ans.creativite >= 4) {
      rec.push({
        title: 'Création Digitale',
        match: 89,
        paths: ['UI/UX Design', 'Motion Design', 'Illustration', 'Montage vidéo'],
      });
    }

    /* -------------------------------------------------
       ÉCONOMIE / BUSINESS
    --------------------------------------------------*/
    if (ans.specialite === 'Économie' || ans.valeurs === 'Prestige') {
      rec.push({
        title: 'Commerce & Management',
        match: 93,
        paths: ['Marketing', 'Finance', 'Entrepreneuriat', 'Management', 'Logistique'],
      });
    }

    if (ans.travailGroupe === 'En groupe' && ans.comm >= 4) {
      rec.push({
        title: 'Relations & Communication',
        match: 87,
        paths: ['Communication', 'Ressources humaines', 'Événementiel', 'Relations internationales'],
      });
    }

    /* -------------------------------------------------
       SCIENCES HUMAINES / SOCIAL
    --------------------------------------------------*/
    if (ans.valeurs === 'Aider les autres') {
      rec.push({
        title: 'Social & Humanitaire',
        match: 90,
        paths: ['Psychologie', 'Éducation', 'Travail social', 'Métiers du paramédical'],
      });
    }

    /* -------------------------------------------------
       NATURE & ENVIRONNEMENT
    --------------------------------------------------*/
    if (Array.isArray(ans.passions) && ans.passions.includes('Nature')) {
      rec.push({
        title: 'Nature & Environnement',
        match: 85,
        paths: ['Écologie', 'Sciences environnementales', 'Géologie', 'Agronomie'],
      });
    }

    if (ans.environnement === 'Extérieur') {
      rec.push({
        title: 'Métiers en plein air',
        match: 82,
        paths: ['Architecture paysage', 'Environnement', 'Sport & coaching', 'Topographie'],
      });
    }

    /* -------------------------------------------------
       MÉTIERS PRATIQUES
    --------------------------------------------------*/
    if (ans.typeActivite === 'Activités pratiques') {
      rec.push({
        title: 'Métiers Techniques & Manuels',
        match: 80,
        paths: ['Cuisine', 'BTP', 'Automobile', 'Menuiserie', 'Maintenance industrielle'],
      });
    }

    /* -------------------------------------------------
       TRI + TOP 3
    --------------------------------------------------*/
    return rec.sort((a, b) => b.match - a.match).slice(0, 3);
  }

  goToSettings(): void {
    // TODO redirect
  }
  isStepLocked(step: number): boolean {
    return step > this.step; // toutes les étapes après l’étape actuelle sont verrouillées
  }
}
