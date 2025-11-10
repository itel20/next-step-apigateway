import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// Note: if you don't use Angular Material, ignore Card imports above.

@Component({
  selector: 'jhi-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export default class DashboardComponent {
  // --- Stat cards ---
  stats = [
    { title: 'Bacheliers inscrits', value: '2,847', color: '#2E7D32', icon: 'users' },
    { title: 'Établissements partenaires', value: '156', color: '#2E7D32', icon: 'school' },
    { title: 'Orientations validées', value: '1,923', color: '#2E7D32', icon: 'graduation' },
    { title: 'Interactions IA', value: '8,432', color: '#2E7D32', icon: 'chat' },
  ];

  // --- Pie / series distribution (ngx-charts expects an array of { name, value }) ---
  seriesData = [
    { name: 'Série S', value: 1245 },
    { name: 'Série L', value: 687 },
    { name: 'Série G', value: 543 },
    { name: 'Série T', value: 372 },
  ];

  // --- Regional bar chart ---
  regionData = [
    { name: 'Dakar', value: 1450 },
    { name: 'Thiès', value: 430 },
    { name: 'Saint-Louis', value: 280 },
    { name: 'Kaolack', value: 245 },
    { name: 'Ziguinchor', value: 190 },
    { name: 'Louga', value: 252 },
  ];

  // --- Monthly line chart (ngx-charts line expects series format) ---
  monthlyData = [
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

  // --- Notifications ---
  notifications = [
    { type: 'info', message: '5 nouvelles bourses disponibles', time: 'Il y a 2h' },
    { type: 'warning', message: '12 demandes de validation en attente', time: 'Il y a 4h' },
    { type: 'success', message: '50 nouvelles inscriptions aujourd’hui', time: 'Il y a 6h' },
  ];

  // ngx-charts options
  view: any[] = [700, 320]; // default view for charts (will be responsive via CSS)
  colorScheme = { domain: ['#2E7D32', '#43A047', '#66BB6A', '#81C784'] };
  barColor = '#2E7D32';
  gradient = false;
  showLegend = false;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  animations = true;
}
