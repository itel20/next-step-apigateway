import { Component, OnInit } from '@angular/core';
import { FilieresService } from './filieres.service';
import { Filiere } from './orientation.model';
import { DecimalPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'jhi-orientations',
  standalone: true,
  imports: [NgClass, NgForOf, NgIf, FormsModule, DecimalPipe],
  templateUrl: './orientations.component.html',
  styleUrls: ['./orientations.component.scss'],
})
export class OrientationsComponent implements OnInit {
  searchTerm = '';
  filieres: Filiere[] = [];
  selectedOrientation: Filiere | null = null;

  constructor(private filieresService: FilieresService) {}

  ngOnInit(): void {
    this.loadFilieres();
  }

  loadFilieres(): void {
    this.filieresService.getAll().subscribe({
      next: (data: Filiere[]) => (this.filieres = data),
      error: (err: unknown) => console.error('Erreur récupération filières', err),
    });
  }

  get filteredOrientations(): Filiere[] {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) return this.filieres;

    return this.filieres.filter((f: Filiere) => f.titre.toLowerCase().includes(q) || f.categorie.toLowerCase().includes(q));
  }

  openDetails(f: Filiere): void {
    this.selectedOrientation = f;
  }

  closeDetails(): void {
    this.selectedOrientation = null;
  }

  deleteOrientation(f: Filiere): void {
    if (!f.id) return;
    if (!confirm(`Confirmer la suppression de "${f.titre}" ?`)) return;

    this.filieresService.delete(f.id).subscribe({
      next: () => {
        this.filieres = this.filieres.filter(x => x.id !== f.id);
        if (this.selectedOrientation?.id === f.id) this.closeDetails();
      },
      error: (err: unknown) => console.error(err),
    });
  }

  difficultyClass(d: string): string {
    switch (d) {
      case 'Très élevée':
        return 'diff-very-high';
      case 'Élevée':
        return 'diff-high';
      case 'Moyenne':
        return 'diff-medium';
      default:
        return 'diff-low';
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }
}
