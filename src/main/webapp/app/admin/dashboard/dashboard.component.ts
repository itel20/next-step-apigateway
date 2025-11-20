import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatistiquesService, Stats1, Stats2 } from './statistiques.service';

import {
  NgApexchartsModule,
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
} from 'ng-apexcharts';

@Component({
  selector: 'jhi-dashbord',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export default class DashboardComponent implements OnInit {
  stats: any[] = [];
  stats1!: Stats1;
  stats2!: Stats2;
  loading = true;

  // ---------- Notifications ----------
  notifications = [
    { type: 'info', message: '5 nouvelles bourses disponibles', time: 'Il y a 2h' },
    { type: 'warning', message: '12 demandes de validation en attente', time: 'Il y a 4h' },
    { type: 'success', message: '50 nouvelles inscriptions aujourd’hui', time: 'Il y a 6h' },
  ];

  // ---------- PIE CHART ----------
  pieSeries: ApexNonAxisChartSeries = [1245, 687, 543, 372];
  pieChart: ApexChart = {
    type: 'pie',
    height: 260,
  };

  pieLabels = ['Série S', 'Série L', 'Série G', 'Série T'];

  // ---------- BAR CHART ----------
  barSeries: ApexAxisChartSeries = [{ name: 'Étudiants', data: [1450, 430, 280, 245, 190, 252] }];

  barChart: ApexChart = {
    type: 'bar',
    height: 260,
  };

  barLabels = ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 'Louga'];

  barPlotOptions: ApexPlotOptions = {
    bar: { columnWidth: '45%', distributed: true },
  };

  // ---------- LINE CHART ----------
  lineSeries: ApexAxisChartSeries = [{ name: 'Inscriptions', data: [120, 210, 350, 260, 410, 580, 620, 230] }];

  lineChart: ApexChart = {
    type: 'line',
    height: 300,
  };

  lineStroke: ApexStroke = { curve: 'smooth' };

  lineLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû'];

  constructor(private statsService: StatistiquesService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.statsService.getStats().subscribe(res1 => {
      this.stats1 = res1;

      this.statsService.getStatistics().subscribe(res2 => {
        this.stats2 = res2;

        this.stats = [
          { title: 'Total Bource & Concours', value: res2.totalBourceConcours, color: '#2E7D32', icon: 'users' },
          { title: 'Total Filiere', value: res2.totalFiliere, color: '#43A047', icon: 'school' },
          { title: 'Total Etablissement', value: res2.totalEtablissement, color: '#66BB6A', icon: 'graduation' },
          { title: 'Total Utilisateurs', value: res1.totalAll, color: '#81C784', icon: 'chat' },
        ];

        this.loading = false;
      });
    });
  }
}
