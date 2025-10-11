import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faTimes, faImage, faFileAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-chatbot-page',
  standalone: true,
  imports: [FaIconComponent], // ✅ Nécessaire pour utiliser <fa-icon>
  templateUrl: './chatbot-page.component.html',
  styleUrl: './chatbot-page.component.scss',
})
export class ChatbotPageComponent {
  isMenuOpen = false;

  // ✅ Icônes utilisées dans le HTML
  faPlus = faPlus;
  faTimes = faTimes;
  faImage = faImage;
  faFileAlt = faFileAlt;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  addPhoto() {
    console.log('Ajouter une photo');
  }

  addDocument() {
    console.log('Ajouter un document');
  }
}
