import { Component, OnInit } from '@angular/core';
import { BourseConcoursService } from './bourse.service';
import { IBourseConcours, BourseConcours } from './bourse.model';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'jhi-bourses',
  standalone: true,
  imports: [NgIf, FormsModule, NgForOf, NgClass],
  templateUrl: './bourses.component.html',
  styleUrls: ['./bourses.component.scss'],
})
export default class BoursesComponent implements OnInit {
  bourses: IBourseConcours[] = [];
  selectedBourse: IBourseConcours | null = null;
  isFormVisible = false;

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
    this.selectedBourse = new BourseConcours();
    this.isFormVisible = true;
  }

  openEdit(bourse: IBourseConcours): void {
    this.selectedBourse = { ...bourse };
    this.isFormVisible = true;
  }

  cancel(): void {
    this.selectedBourse = null;
    this.isFormVisible = false;
  }

  save(): void {
    if (!this.selectedBourse) return;

    const bourseToSend = new BourseConcours(
      this.selectedBourse.id,
      this.selectedBourse.titre,
      this.selectedBourse.type,
      this.selectedBourse.description,
      this.selectedBourse.montant,
      this.selectedBourse.periodicite,
      this.selectedBourse.nombreBeneficiaires,
      this.selectedBourse.tauxAcceptation,
      this.selectedBourse.dateLimite,
      this.selectedBourse.criteresEligibilite,
      this.selectedBourse.tags,
      this.selectedBourse.conseilsPratiques,
      this.selectedBourse.favoris,
      this.selectedBourse.pays,
    );

    let request;
    if (bourseToSend.id === null) {
      request = this.bourseService.create(bourseToSend);
    } else {
      request = this.bourseService.update(bourseToSend.id, bourseToSend);
    }

    request.subscribe({
      next: () => {
        this.loadAll();
        this.cancel();
      },
      error: err => console.error('Erreur sauvegarde:', err),
    });
  }

  delete(id: number | null): void {
    if (id === null) return;

    if (confirm('Supprimer cette bourse ?')) {
      this.bourseService.delete(id).subscribe({
        next: () => this.loadAll(),
        error: err => console.error('Erreur suppression:', err),
      });
    }
  }
  onCriteresChange(value: string): void {
    if (this.selectedBourse) {
      this.selectedBourse.criteresEligibilite = value.split(',').map((v: string) => v.trim());
    }
  }

  onTagsChange(value: string): void {
    if (this.selectedBourse) {
      this.selectedBourse.tags = value.split(',').map((v: string) => v.trim());
    }
  }
}
