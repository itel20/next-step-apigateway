import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardService, StatsReponse, StatsReponses } from './dashboard.service'; // utilise StatsReponses pour les cartes

@Component({
  selector: 'jhi-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export default class DashboardComponent implements OnInit {
  // --- Stat cards ---
  // Définition du type pour les cartes
  stats: { title: string; value: number; color: string; icon: string; colorText: string }[] = [];

  // --- Charts ---
  seriesData: { name: string; value: number }[] = [];
  regionData: { name: string; value: number }[] = [];
  monthlyData: { name: string; series: { name: string; value: number }[] }[] = [];

  // --- Notifications ---
  notifications = [
    { type: 'info', message: '5 nouvelles bourses disponibles', time: 'Il y a 2h' },
    { type: 'warning', message: '12 demandes de validation en attente', time: 'Il y a 4h' },
    { type: 'success', message: '50 nouvelles inscriptions aujourd’hui', time: 'Il y a 6h' },
  ];

  // ngx-charts options
  view: any[] = [700, 320];
  colorScheme = { domain: ['#2E7D32', '#43A047', '#66BB6A', '#81C784'] };
  gradient = false;
  animations = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStatistics(); // on utilise la bonne méthode
    this.loadCharts();
  }

  private loadStatistics(): void {
    this.dashboardService.getStatistics().subscribe((data: StatsReponses) => {
      this.stats = [
        { title: 'Bourses/Concours', value: data.totalBourceConcours, color: '#fff', icon: 'bi-cash', colorText: '#1e7d32' },
        { title: 'Filières', value: data.totalFiliere, color: '#fff', icon: 'bi-journal-bookmark', colorText: '#c9a800' },
        { title: 'Établissements', value: data.totalEtablissement, color: '#fff', icon: 'bi-building', colorText: '#1e7d32' },
      ];
    });

    this.dashboardService.getStats().subscribe((res: StatsReponse) => {
      this.stats.push({
        title: 'Total',
        value: res.totalAll,
        color: '#fff',
        icon: 'bi-bar-chart',
        colorText: '#c9a800',
      });
    });
  }

  private loadCharts(): void {
    // Exemple fixe pour charts
    this.seriesData = [
      { name: 'Série S', value: 1245 },
      { name: 'Série L', value: 687 },
      { name: 'Série G', value: 543 },
      { name: 'Série T', value: 372 },
    ];

    this.regionData = [
      { name: 'Dakar', value: 1450 },
      { name: 'Thiès', value: 430 },
      { name: 'Saint-Louis', value: 280 },
      { name: 'Kaolack', value: 245 },
      { name: 'Ziguinchor', value: 190 },
      { name: 'Louga', value: 252 },
    ];

    this.monthlyData = [
      {
        name: 'Inscriptions',
        series: [
          { name: 'Jan', value: 120 },
          { name: 'Fév', value: 210 },
          { name: 'Mar', value: 350 },
          { name: 'Avr', value: 260 },
          { name: 'Mai', value: 410 },
          { name: 'Jun', value: 580 },
          { name: 'Jul', value: 620 },
          { name: 'Aoû', value: 230 },
        ],
      },
    ];
  }
}
