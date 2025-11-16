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
  bourses: BourseConcours[] = [];
  selectedBourse: BourseConcours | null = null;
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
      next: data => {
        this.bourses = data.map(
          b =>
            new BourseConcours(
              b.id,
              b.titre,
              b.type,
              b.description,
              b.montant,
              b.periodicite,
              b.nombreBeneficiaires,
              b.tauxAcceptation,
              b.dateLimite,
              b.criteresEligibilite.length ? b.criteresEligibilite : ['Non défini'],
              b.tags.length ? b.tags : ['Aucun'],
              b.conseilsPratiques,
              b.favoris ?? false,
              b.pays,
            ),
        );
      },
      error: err => console.error('Erreur chargement bourses:', err),
    });
  }

  openCreate(): void {
    this.selectedBourse = new BourseConcours();
    this.isFormVisible = true;
  }

  openEdit(bourse: IBourseConcours): void {
    this.selectedBourse = new BourseConcours(
      bourse.id,
      bourse.titre,
      bourse.type,
      bourse.description,
      bourse.montant,
      bourse.periodicite,
      bourse.nombreBeneficiaires,
      bourse.tauxAcceptation,
      bourse.dateLimite,
      bourse.criteresEligibilite.length ? bourse.criteresEligibilite : ['Non défini'],
      bourse.tags.length ? bourse.tags : ['Aucun'],
      bourse.conseilsPratiques,
      bourse.favoris ?? false,
      bourse.pays,
    );
    this.isFormVisible = true;
  }

  save(): void {
    if (!this.selectedBourse) return;

    const b = this.selectedBourse;
    const request = b.id == null ? this.bourseService.create(b) : this.bourseService.update(b.id, b);

    request.subscribe({
      next: savedBourse => {
        if (b.id == null) {
          this.bourses.push(
            new BourseConcours(
              savedBourse.id,
              savedBourse.titre,
              savedBourse.type,
              savedBourse.description,
              savedBourse.montant,
              savedBourse.periodicite,
              savedBourse.nombreBeneficiaires,
              savedBourse.tauxAcceptation,
              savedBourse.dateLimite,
              savedBourse.criteresEligibilite.length ? savedBourse.criteresEligibilite : ['Non défini'],
              savedBourse.tags.length ? savedBourse.tags : ['Aucun'],
              savedBourse.conseilsPratiques,
              savedBourse.favoris ?? false,
              savedBourse.pays,
            ),
          );
        } else {
          const index = this.bourses.findIndex(x => x.id === b.id);
          if (index > -1) this.bourses[index] = b;
        }
        this.cancel();
      },
      error: err => console.error('Erreur sauvegarde:', err),
    });
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

  viewDetails(bourse: IBourseConcours): void {
    this.selectedBourse = new BourseConcours(
      bourse.id,
      bourse.titre,
      bourse.type,
      bourse.description,
      bourse.montant,
      bourse.periodicite,
      bourse.nombreBeneficiaires,
      bourse.tauxAcceptation,
      bourse.dateLimite,
      bourse.criteresEligibilite.length ? bourse.criteresEligibilite : ['Non défini'],
      bourse.tags.length ? bourse.tags : ['Aucun'],
      bourse.conseilsPratiques,
      bourse.favoris ?? false, // ⚠️ conversion obligatoire ici
      bourse.pays,
    );
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
