import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PublicationService } from './publication.service';
import { Publication } from './publication.model';

/* ===================== INTERFACES ===================== */

interface Actu {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
}

interface Topic {
  id: number;
  subject: string;
  user: string;
  comment: string;
  likes: number;
  responses: number;
  certified: boolean;
  avatar: string;
  time: string;
}

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  age: number;
  school: string;
  likes: number;
  comments: number;
  avatar: string;
}

/* ===================== COMPONENT ===================== */

@Component({
  selector: 'jhi-actus',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actus.component.html',
  styleUrls: ['./actus.component.scss'],
})
export class ActusComponent implements OnInit {
  /* ===================== ETAT ===================== */

  visibleTestimonials = 3;
  newQuestion = '';

  likedTopics = new Set<number>();
  likedTestimonials = new Set<number>();

  topics: Topic[] = [];

  /* ===================== CONSTRUCTOR ===================== */

  constructor(private publicationService: PublicationService) {}

  /* ===================== INIT ===================== */

  ngOnInit(): void {
    this.loadTopics();
  }

  /* ===================== ACTUS STATIQUES ===================== */

  actusEvents: Actu[] = [
    {
      id: 1,
      title: 'Journée Portes Ouvertes',
      description: 'Explorez nos programmes et échangez avec nos étudiants. Inscriptions gratuites.',
      date: '15 Décembre 2024',
      category: 'Événement',
      image: 'content/images/3I9A7895-scaled.jpg',
    },
    {
      id: 2,
      title: 'Nouvelle filière IA',
      description: 'L’École Supérieure Polytechnique ouvre un programme d’Intelligence Artificielle dès la rentrée 2025.',
      date: '10 Décembre 2024',
      category: 'Actualité',
      image: 'content/images/20240126_65b31ebfcd4c8.jpg',
    },
    {
      id: 3,
      title: "Salon de l'Étudiant Africain",
      description: 'Rencontrez plus de 100 établissements pour définir votre orientation. Entrée gratuite.',
      date: '20 Décembre 2024',
      category: 'Événement',
      image: 'content/images/11238218-18690235.jpg',
    },
    {
      id: 4,
      title: "Bourses d'excellence",
      description: '500 bourses supplémentaires pour les bacheliers 2024. Déposez votre candidature.',
      date: '5 Décembre 2024',
      category: 'Actualité',
      image: 'content/images/Bourses-dExcellence-UEMOA-a-la-Formation-et-a-la-Recherche.jpg',
    },
  ];

  /* ===================== TESTIMONIALS ===================== */

  allTestimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Cette plateforme m'a aidé à découvrir ma passion pour l'informatique. Aujourd'hui, je suis en L3 et épanouie.",
      name: 'Fatou Sall',
      age: 20,
      school: 'ESP Dakar',
      likes: 89,
      comments: 15,
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      id: 2,
      quote: "Le test d'orientation a été décisif. J'ai compris que le design graphique pouvait être un vrai métier.",
      name: 'Ousmane Diaw',
      age: 19,
      school: 'ESEA Dakar',
      likes: 102,
      comments: 22,
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    {
      id: 3,
      quote: "Les conseillers ont été très attentifs et m'ont guidée vers la filière qui correspondait à mes compétences.",
      name: 'Aïssatou Ndiaye',
      age: 21,
      school: 'UCAD',
      likes: 76,
      comments: 11,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 4,
      quote: "Après mon bac, j'étais perdu. Cette plateforme m'a offert une orientation claire. Merci !",
      name: 'Mamadou Ba',
      age: 20,
      school: 'ISM',
      likes: 54,
      comments: 8,
      avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    },
  ];

  /* ===================== API PUBLICATIONS ===================== */

  loadTopics(): void {
    this.publicationService.getAll().subscribe(publications => {
      this.topics = publications.map(p => ({
        id: p.id!,
        subject: 'Discussion',
        user: p.authorType,
        comment: p.content,
        likes: 0,
        responses: 0,
        certified: p.authorType === 'CONSEILLER',
        avatar: '',
        time: this.formatDate(p.createdAt),
      }));
    });
  }

  sendQuestion(): void {
    if (!this.newQuestion.trim()) return;

    const publication: Publication = {
      content: this.newQuestion,
      authorId: 1, // TODO: JWT
      authorType: 'ETUDIANT',
    };

    this.publicationService.create(publication).subscribe(saved => {
      this.topics.unshift({
        id: saved.id!,
        subject: 'Discussion',
        user: saved.authorType,
        comment: saved.content,
        likes: 0,
        responses: 0,
        certified: saved.authorType === 'CONSEILLER',
        avatar: '',
        time: 'À l’instant',
      });

      this.newQuestion = '';
    });
  }

  /* ===================== LIKES ===================== */

  toggleLikeTopic(id: number): void {
    if (this.likedTopics.has(id)) {
      this.likedTopics.delete(id);
    } else {
      this.likedTopics.add(id);
    }
  }

  toggleLikeTestimonial(id: number): void {
    if (this.likedTestimonials.has(id)) {
      this.likedTestimonials.delete(id);
    } else {
      this.likedTestimonials.add(id);
    }
  }

  /* ===================== UI HELPERS ===================== */

  loadMoreTestimonials(): void {
    this.visibleTestimonials = Math.min(this.visibleTestimonials + 3, this.allTestimonials.length);
  }

  getInitials(name: string): string {
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  formatDate(date?: string): string {
    return date ? new Date(date).toLocaleString() : '';
  }
}
