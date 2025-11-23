import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { Authority } from 'app/config/authority.constants';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'jhi-custom-login',
  standalone: true,
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss'],
  imports: [NgForOf],
})
export class CustomLoginComponent implements OnInit {
  images = ['assets/slide1.jpg', 'assets/slide2.jpg', 'assets/slide3.jpg'];
  currentIndex = 0;

  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    // Vérifie si déjà connecté
    this.accountService.identity().subscribe(account => {
      if (account) {
        const isAdmin = account.authorities.includes(Authority.ADMIN);
        this.router.navigate([isAdmin ? '/admin/dashboard' : '/home']);
      }
    });
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5500);
  }

  login(): void {
    const redirectUri = `${location.origin}/login`; // on revient sur login après Keycloak
    location.href = `${location.origin}/oauth2/authorization/oidc?redirect_uri=${redirectUri}`;
  }
}
