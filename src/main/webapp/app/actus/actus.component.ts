import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface Actu {
  title: string;
  description: string;
}

export interface Topic {
  subject: string;
  user: string;
  comment: string;
  likes: number;
  responses: number;
  certified?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  age: number;
  school: string;
  publishedDate: string;
  likes: number;
  comments: number;
}
@Component({
  selector: 'jhi-actus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actus.component.html',
  styleUrl: './actus.component.scss',
})
export class ActusComponent {
  actusEvents: Actu[] = [
    {
      title: 'Journées Portes Ouvertes',
      description: 'Objectif : permettre aux bacheliers de découvrir notre institut et nos formations.',
    },
    {
      title: 'Orientations et Métiers d’Avenir',
      description: 'Actualités pour guider les jeunes vers les secteurs d’avenir et les filières prometteuses.',
    },
    {
      title: 'Conférence Alumni',
      description: 'Rencontres avec nos anciens élèves pour partager expériences et conseils.',
    },
  ];

  topics: Topic[] = [
    {
      subject: 'Comment choisir sa filière après le bac ?',
      user: 'Moussa S.',
      comment: 'Je suis perdu entre sciences et lettres, des conseils ?',
      likes: 12,
      responses: 5,
      certified: true,
    },
    {
      subject: 'Stages d’été disponibles',
      user: 'Awa D.',
      comment: 'Quels stages sont ouverts pour les bacheliers 2025 ?',
      likes: 8,
      responses: 2,
    },
  ];

  testimonials: Testimonial[] = [
    {
      quote: 'Grâce à ce programme, j’ai pu choisir ma filière sereinement.',
      name: 'Fatou B.',
      age: 19,
      school: 'Lycée Blaise Diagne',
      publishedDate: '2025-10-10',
      likes: 25,
      comments: 3,
    },
    {
      quote: 'Les journées portes ouvertes m’ont vraiment aidé à comprendre les métiers disponibles.',
      name: 'Mamadou T.',
      age: 20,
      school: 'Lycée A. Diop',
      publishedDate: '2025-10-12',
      likes: 18,
      comments: 4,
    },
  ];

  loadMoreTestimonials(): void {
    // Exemple pour charger plus de témoignages
    this.testimonials.push({
      quote: 'Super expérience, je recommande à tous les futurs bacheliers !',
      name: 'Aissatou N.',
      age: 18,
      school: 'Lycée K. Mbaye',
      publishedDate: '2025-10-14',
      likes: 10,
      comments: 1,
    });
  }
}
