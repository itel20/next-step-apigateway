import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BourseConcoursService } from 'app/services/bourse.service';
import { BourseConcours } from 'app/models/bourse.model';

@Component({
  selector: 'jhi-bourses',
  standalone: true,
  imports: [NgIf, FormsModule, NgForOf, NgClass],
  templateUrl: './bourses.component.html',
  styleUrls: ['./bourses.component.scss'],
})
export default class BoursesComponent implements OnInit {
  searchTerm = '';
  filterType: 'all' | 'Bourse' | 'Concours' = 'all';

  scholarships: BourseConcours[] = [];
  selectedScholarship: BourseConcours | null = null;
  notificationsCount = 0;

  constructor(private bcService: BourseConcoursService) {}

  ngOnInit(): void {
    this.loadData();
  }

  /** Charger depuis le backend */
  loadData(): void {
    this.bcService.getAll().subscribe({
      next: res => {
        this.scholarships = res;
      },
      error: err => console.error('Erreur chargement Bourses:', err),
    });
  }

  /** Filtres */
  get filteredScholarships(): BourseConcours[] {
    const q = this.searchTerm.trim().toLowerCase();
    return this.scholarships.filter(s => {
      const matchesSearch = !q || s.titre.toLowerCase().includes(q);
      const matchesType = this.filterType === 'all' || s.type === this.filterType;
      return matchesSearch && matchesType;
    });
  }

  selectScholarship(s: BourseConcours): void {
    this.selectedScholarship = s;
  }

  closeDialog(): void {
    this.selectedScholarship = null;
  }

  /** Ajouter une bourse */
  addScholarship(): void {
    const titre = prompt('Titre de la bourse ?');
    if (!titre) return;

    const dto: BourseConcours = {
      id: null,
      titre,
      type: 'Bourse',
      montant: 0,
      periodicite: '',
      nombreBeneficiaires: 0,
      tauxAcceptation: 0,
      dateLimite: new Date(),
      criteresEligibilite: [],
      tags: [],
      conseilsPratiques: '',
      favoris: false,
    };

    this.bcService.create(dto).subscribe({
      next: () => this.loadData(),
    });
  }

  /** Modifier */
  editScholarship(s: BourseConcours): void {
    const newTitle = prompt('Nouveau titre ?', s.titre);
    if (!newTitle) return;

    const dto = { ...s, titre: newTitle };

    this.bcService.update(s.id!, dto).subscribe({
      next: () => this.loadData(),
    });
  }

  /** Supprimer */
  deleteScholarship(s: BourseConcours): void {
    if (!confirm(`Supprimer "${s.titre}" ?`)) return;

    this.bcService.delete(s.id!).subscribe({
      next: () => this.loadData(),
    });
  }

  /** CTA */
  applyNow(s: BourseConcours | null): void {
    if (!s) return;
    alert(`Postuler à "${s.titre}" (implémenter la candidature)`);
  }
}
