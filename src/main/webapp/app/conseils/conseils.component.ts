import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RouterLink } from '@angular/router';

interface Media {
  type: 'video' | 'book';
  titre: string;
  duree: string;
  action: string;
  url: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  stars: number;
}

@Component({
  selector: 'jhi-conseils',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './conseils.component.html',
  styleUrls: ['./conseils.component.scss'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))]),
    ]),
    trigger('rotateChevron', [
      state('open', style({ transform: 'rotate(90deg)' })),
      state('closed', style({ transform: 'rotate(0deg)' })),
      transition('open <=> closed', [animate('200ms ease-in-out')]),
    ]),
  ],
})
export class ConseilsComponent {
  // === Variables ===
  showQuestionnaire = false;

  conseiller = {
    nom: 'Itelvina Sane',
    specialite: 'Orientation Étudiante',
    langues: 'Français, Anglais',
    ville: 'Dakar',
    disponibilite: 'Lun-Ven, 9h-17h',
  };

  medias: Media[] = [
    {
      type: 'video',
      titre: 'Comment choisir sa filière ?',
      duree: '5 min',
      action: 'Regarder',
      url: 'https://youtu.be/Sn7bOck9f1A?si=FpfnsidOmz5IaedM', // lien YouTube
    },
    {
      type: 'book',
      titre: 'Guide de l’étudiant',
      duree: '12 min',
      action: 'Lire',
      url: 'https://orientation.campusen.sn/guide', // lien PDF
    },
  ];

  faqs = [
    { question: 'Comment ça marche ?', reponse: 'Notre IA analyse ton profil et recommande des filières adaptées.' },
    { question: 'Est-ce gratuit ?', reponse: 'Oui, l’utilisation de la plateforme est entièrement gratuite.' },
  ];
  openFaqIndex: number | null = null;

  questionInput = '';

  testimonials: Testimonial[] = [
    {
      name: 'Agathe Mack Sene',
      role: 'Étudiante en Ingénierie',
      text: "Grâce à cette plateforme, j'ai trouvé ma voie en ingénierie.",
      stars: 5,
    },
    {
      name: 'elhadj ibrahima Lo',
      role: 'Étudiant en Commerce',
      text: 'Le test d’orientation m’a aidé à choisir la bonne filière.',
      stars: 5,
    },
    {
      name: 'Kadidiatou Sima',
      role: 'Étudiante en Arts',
      text: 'Interface moderne et conseils pertinents. Je recommande à tous les jeunes !',
      stars: 5,
    },
  ];

  stats = [
    { value: '15K+', label: 'Étudiants orientés' },
    { value: '95%', label: 'Taux de satisfaction' },
    { value: '200+', label: 'Filières analysées' },
  ];

  // === Méthodes ===
  toggleFaq(index: number): void {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  handleSendQuestion(): void {
    if (this.questionInput.trim()) {
      // Ici tu peux envoyer la question à ton backend
      // ou afficher un toast / snackbar
      this.questionInput = '';
    }
  }

  // === Générer les initiales pour les avatars ===
  getInitials(name: string): string {
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
}
