import { Component, OnInit } from '@angular/core';
import { BourseConcoursService } from './bourse.service';
import { BourseConcours, IBourseConcours } from './bourse.model';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterBoursePipe } from '../../pipes/filter-bourse.pipe';

@Component({
  selector: 'jhi-bourses',
  standalone: true,
  imports: [NgIf, FormsModule, NgForOf, NgClass, FilterBoursePipe],
  templateUrl: './bourses.component.html',
  styleUrls: ['./bourses.component.scss'],
})
export default class BoursesComponent implements OnInit {
  bourses: IBourseConcours[] = []; // 👈 IBourseConcours pour éviter mismatch
  selectedBourse: IBourseConcours | null = null; // 👈 plus de BourseConcours ici

  isFormVisible = false;
  showDetailsModal = false;

  searchTerm = '';
  filterType = '';

  constructor(private bourseService: BourseConcoursService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.bourseService.getAll().subscribe({
      next: data => (this.bourses = data),
      error: err => console.error('Erreur chargement bourses:', err),
    });
  }

  openCreate(): void {
    this.selectedBourse = new BourseConcours(); // 👈 ça reste OK uniquement ici
    this.isFormVisible = true;
  }

  openEdit(b: IBourseConcours): void {
    this.selectedBourse = { ...b, favoris: b.favoris ?? null }; // 👈 évite undefined
    this.isFormVisible = true;
  }

  save(): void {
    if (!this.selectedBourse) return;

    if (this.selectedBourse.id) {
      // UPDATE
      this.bourseService.update(this.selectedBourse.id, this.selectedBourse).subscribe(() => {
        this.loadAll();
        this.isFormVisible = false;
      });
    } else {
      // CREATE
      this.bourseService.create(this.selectedBourse).subscribe(() => {
        this.loadAll();
        this.isFormVisible = false;
      });
    }
  }

  delete(id: number | null): void {
    if (!id) return;
    if (confirm('Supprimer cette bourse ?')) {
      this.bourses = this.bourses.filter(b => b.id !== id);
      this.bourseService.delete(id).subscribe({
        error: err => console.error('Erreur suppression:', err),
      });
    }
  }

  viewDetails(b: IBourseConcours): void {
    this.selectedBourse = { ...b, favoris: b.favoris ?? null };
    this.showDetailsModal = true;
  }

  cancel(): void {
    this.selectedBourse = null;
    this.isFormVisible = false;
    this.showDetailsModal = false;
  }

  onCriteresChange(value: string): void {
    if (this.selectedBourse) {
      this.selectedBourse.criteresEligibilite = value.split(',').map(s => s.trim());
    }
  }

  onTagsChange(value: string): void {
    if (this.selectedBourse) {
      this.selectedBourse.tags = value.split(',').map(s => s.trim());
    }
  }
}
