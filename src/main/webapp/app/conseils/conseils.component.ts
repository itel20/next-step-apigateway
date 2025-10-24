import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Conseiller {
  nom: string;
  specialite: string;
  langues: string;
  ville: string;
  disponibilite: string;
}

interface Media {
  type: 'video' | 'guide';
  titre: string;
  action: string;
  bouton: string;
}

interface Faq {
  question: string;
  reponse: string;
}
@Component({
  selector: 'jhi-conseils',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './conseils.component.html',
  styleUrl: './conseils.component.scss',
})
export class ConseilsComponent {
  conseiller: Conseiller = {
    nom: 'Christ John',
    specialite: 'Orientation post-bac',
    langues: 'Français, Anglais',
    ville: 'Dakar',
    disponibilite: 'Affichées sur clic bouton',
  };

  medias: Media[] = [
    {
      type: 'video',
      titre: 'Vidéo : Comment choisir sa filière',
      action: 'Regarder',
      bouton: 'watch-btn',
    },
    {
      type: 'guide',
      titre: 'Guide réussir ta réorientation',
      action: 'Lire',
      bouton: 'read-btn',
    },
  ];

  faqs: Faq[] = [
    {
      question: 'Quelle est la différence entre une licence et un BTS ?',
      reponse: 'Licence : 3 ans à l’université, plus théorique. BTS : 2 ans, plus professionnalisant.',
    },
    {
      question: 'Peut-on changer de filière après un semestre ?',
      reponse: 'Oui, sous certaines conditions (places disponibles, accord de l’administration). Parlez-en avec un conseiller.',
    },
    {
      question: 'Que faire après un bac pro ?',
      reponse: 'Plusieurs options : BTS, écoles spécialisées, concours ou vie active.',
    },
    {
      question: 'Existe-t-il des aides pour étudier à l’étranger ?',
      reponse: 'Oui, plusieurs institutions (Campus France, DAAD, etc.) proposent des bourses selon les profils.',
    },
    {
      question: 'Les logements universitaires sont-ils accessibles à tous ?',
      reponse: 'Non, il faut généralement faire une demande et les places sont limitées.',
    },
  ];

  // Optionnel : interactivité FAQ (afficher/masquer la réponse)
  toggleFaq(index: number): void {
    const el = document.getElementById(`faq-${index}`);
    if (el) {
      el.classList.toggle('open');
    }
  }
}
