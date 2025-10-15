import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faLaptopCode, faPencilAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'jhi-test-orientation',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './test-orientation.component.html',
  styleUrl: './test-orientation.component.scss',
})
export class TestOrientationComponent {
  selectedClass = '';
  otherClass = '';
  searchQuery = '';
  faBullseye = faBullseye;

  onSubmit(): void {
    const selected = this.selectedClass === 'Autre' ? this.otherClass : this.selectedClass;
    alert(`Classe sélectionnée : ${selected}`); // option simple pour tester
  }
  onSearch(): void {
    // TODO: implémentation future
  }
}
