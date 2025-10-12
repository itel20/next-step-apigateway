import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTimes, faCamera, faFile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-chatbot-page',
  standalone: true,
  imports: [FontAwesomeModule], // ✅ Nécessaire pour <fa-icon>
  templateUrl: './chatbot-page.component.html',
  styleUrl: './chatbot-page.component.scss',
})
export default class ChatbotPageComponent {
  isMenuOpen = false;

  // ✅ Icônes accessibles dans le template
  faPlus = faPlus;
  faTimes = faTimes;
  faCamera = faCamera;
  faFile = faFile;
  faPaperPlane = faPaperPlane;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  addPhoto(): void {
    // Action à implémenter plus tard
  }

  addDocument(): void {
    // Action à implémenter plus tard
  }
}
