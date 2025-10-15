import { Component, OnInit, inject, signal, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { faLaptopCode, faPencilAlt, faTasks } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

  // styleUrl: './home.component.scss',
  imports: [SharedModule, RouterModule, FormsModule],
})
export default class HomeComponent implements OnInit, AfterViewInit {
  // ✅ Les propriétés avant le constructor
  account = signal<Account | null>(null);
  searchQuery = '';

  jobs = [
    { id: 1, title: 'Développeur Web', description: 'Angular / Spring Boot', icon: faLaptopCode },
    { id: 1, title: 'Développeur Web', description: 'Angular / Spring Boot', icon: faLaptopCode },
    { id: 2, title: 'Designer UX/UI', description: 'Figma / Adobe XD', icon: faPencilAlt },
    { id: 3, title: 'Chef de projet', description: 'Méthodologie Agile / Scrum', icon: faTasks },
  ];

  isShrunk = false;

  private readonly accountService = inject(AccountService);
  private readonly loginService = inject(LoginService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => this.account.set(account));
    setTimeout(() => {
      this.isShrunk = true;
    }, 5 * 1000);
  }

  login(): void {
    this.loginService.login();
  }

  goToChatbotPage(): void {
    this.router.navigate(['/chatbot']);
  }

  onSearch(): void {
    // TODO: implémentation future
  }

  startOrientation(): void {
    // TODO: implémentation future
  }

  doTest(): void {
    // TODO: implémentation future
  }

  discover(): void {
    // TODO: implémentation future
  }

  viewDetails(job: any): void {
    // TODO: implémentation future
  }

  filteredJobs(): any[] {
    if (!this.searchQuery) {
      return this.jobs;
    }

    return this.jobs.filter(job => job.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
  ngAfterViewInit(): void {
    const input = document.querySelector('.search-bar input');
    if (input) {
      input.addEventListener('focus', event => {
        event.preventDefault();
        window.scrollTo(0, 0);
      });
    }
  }
}
