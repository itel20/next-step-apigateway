import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'jhi-splash-screen',
  standalone: true,
  imports: [],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('1s ease-in', style({ opacity: 1 }))]),
      transition(':leave', [animate('1s ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SplashScreenComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Affiche le logo pendant 3 secondes puis redirige vers /login
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
