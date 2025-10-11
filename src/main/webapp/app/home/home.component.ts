import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import SharedModule from 'app/shared/shared.module';
import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  standalone: true,
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [SharedModule, RouterModule, FormsModule],
})
export default class HomeComponent implements OnInit {
  account = signal<Account | null>(null);

  // ✅ Pas besoin de ": string"
  searchQuery = '';

  jobs = [
    { id: 1, title: 'Développeur Web', description: 'Angular / Spring Boot' },
    { id: 2, title: 'Designer UX/UI', description: 'Figma / Adobe XD' },
    { id: 3, title: 'Chef de projet', description: 'Méthodologie Agile / Scrum' },
  ];

  private readonly accountService = inject(AccountService);
  private readonly loginService = inject(LoginService);

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => this.account.set(account));
  }

  login(): void {
    this.loginService.login();
  }

  // ✅ Suppression des console.log
  onSearch(): void {
    // TODO: implémenter la recherche
  }

  startOrientation(): void {
    // TODO: implémenter l’orientation
  }

  doTest(): void {
    // TODO: implémenter le test
  }

  discover(): void {
    // TODO: implémenter la découverte
  }

  viewDetails(job: any): void {
    // TODO: afficher les détails du job
  }

  filteredJobs(): any[] {
    if (!this.searchQuery) {
      return this.jobs;
    }

    return this.jobs.filter(job => job.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
}
