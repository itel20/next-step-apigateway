import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarChartModule, PieChartModule } from '@swimlane/ngx-charts';

interface Orientation {
  id: number;
  bachelier: string;
  serie: string;
  filiere: string;
  etablissement: string;
  statut: string;
  dateValidation: string;
  scoreIA: number;
}
@Component({
  selector: 'jhi-orientations',
  standalone: true,
  imports: [NgClass, FormsModule, BarChartModule, PieChartModule, NgForOf],
  templateUrl: './orientations.component.html',
  styleUrl: './orientations.component.scss',
})
export default class OrientationsComponent {
  filterStatus = 'all';
  filterRegion = 'all';

  mockOrientations: Orientation[] = [
    {
      id: 1,
      bachelier: 'Amadou Diop',
      serie: 'S',
      filiere: 'Informatique',
      etablissement: 'ESP - Dakar',
      statut: 'Accepté',
      dateValidation: '2024-10-15',
      scoreIA: 92,
    },
    {
      id: 2,
      bachelier: 'Fatou Ndiaye',
      serie: 'L',
      filiere: 'Lettres Modernes',
      etablissement: 'UCAD - Dakar',
      statut: 'En attente',
      dateValidation: '-',
      scoreIA: 85,
    },
    {
      id: 3,
      bachelier: 'Moussa Sall',
      serie: 'S',
      filiere: 'Génie Civil',
      etablissement: 'ESP - Dakar',
      statut: 'Accepté',
      dateValidation: '2024-10-18',
      scoreIA: 88,
    },
    {
      id: 4,
      bachelier: 'Awa Fall',
      serie: 'G',
      filiere: 'Gestion',
      etablissement: 'UCAD - Dakar',
      statut: 'Refusé',
      dateValidation: '2024-10-12',
      scoreIA: 65,
    },
    {
      id: 5,
      bachelier: 'Mame Sarr',
      serie: 'S',
      filiere: 'Médecine',
      etablissement: 'UCAD - Dakar',
      statut: 'En attente',
      dateValidation: '-',
      scoreIA: 90,
    },
    {
      id: 6,
      bachelier: 'Cheikh Sy',
      serie: 'L',
      filiere: 'Droit',
      etablissement: 'UGB - Saint-Louis',
      statut: 'Accepté',
      dateValidation: '2024-10-20',
      scoreIA: 87,
    },
    {
      id: 7,
      bachelier: 'Astou Diallo',
      serie: 'S',
      filiere: 'Mathématiques',
      etablissement: 'UGB - Saint-Louis',
      statut: 'Accepté',
      dateValidation: '2024-10-19',
      scoreIA: 91,
    },
    {
      id: 8,
      bachelier: 'Ibrahima Kante',
      serie: 'T',
      filiere: 'Électromécanique',
      etablissement: 'ESP - Dakar',
      statut: 'En attente',
      dateValidation: '-',
      scoreIA: 78,
    },
  ];

  filiereStatsData = [
    { name: 'Informatique', demandes: 450 },
    { name: 'Médecine', demandes: 380 },
    { name: 'Génie Civil', demandes: 320 },
    { name: 'Droit', demandes: 280 },
    { name: 'Gestion', demandes: 250 },
    { name: 'Lettres', demandes: 180 },
  ];

  statusData = [
    { name: 'Accepté', value: 1245, color: '#2E7D32' },
    { name: 'En attente', value: 487, color: '#FFA726' },
    { name: 'Refusé', value: 191, color: '#E53935' },
  ];

  get filteredOrientations(): Orientation[] {
    return this.mockOrientations.filter(o => {
      const matchStatus = this.filterStatus === 'all' || o.statut === this.filterStatus;
      const matchRegion = this.filterRegion === 'all' || o.etablissement.includes(this.filterRegion);
      return matchStatus && matchRegion;
    });
  }

  exportData(): void {
    // console.log('Exporter les données...');
  }
}
