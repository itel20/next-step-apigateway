import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardService, StatsReponse, StatsReponses } from './dashboard.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'jhi-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export default class DashboardComponent implements OnInit {
  // --- Déclaration explicite des types ---
  stats: { title: string; value: number; color: string; icon: string }[] = [];
  seriesData: { name: string; value: number }[] = [];
  regionData: { name: string; value: number }[] = [];
  monthlyData: { name: string; series: { name: string; value: number }[] }[] = [];
  notifications: { type: string; message: string; time: string }[] = [];

  animations = true;
  gradient = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadStatistics();
    this.loadCharts();
    this.loadNotifications();
  }

  private loadStats(): void {
    this.dashboardService.getStats().subscribe((data: StatsReponse) => {
      this.stats = [
        { title: 'Bacheliers inscrits', value: data.totalEtudiants, color: '#2E7D32', icon: 'bi-people' },
        { title: 'Élèves inscrits', value: data.totalEleves, color: '#43A047', icon: 'bi-building' },
        { title: 'Conseillers actifs', value: data.totalConseillers, color: '#66BB6A', icon: 'bi-person-check' },
        { title: 'Total général', value: data.totalAll, color: '#81C784', icon: 'bi-bar-chart' },
      ];
    });
  }

  private loadStatistics(): void {
    this.dashboardService.getStatistics().subscribe((data: StatsReponses) => {
      this.seriesData = [
        { name: 'Bourses/Concours', value: data.totalBourceConcours },
        { name: 'Filières', value: data.totalFiliere },
        { name: 'Établissements', value: data.totalEtablissement },
      ];
    });
  }

  private loadCharts(): void {
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

  private loadNotifications(): void {
    this.notifications = [
      { type: 'info', message: '5 nouvelles bourses disponibles', time: 'Il y a 2h' },
      { type: 'warning', message: '12 demandes de validation en attente', time: 'Il y a 4h' },
      { type: 'success', message: '50 nouvelles inscriptions aujourd’hui', time: 'Il y a 6h' },
    ];
  }
}
