import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { Authority } from 'app/config/authority.constants';

@Component({
  selector: 'jhi-custom-login',
  standalone: true,
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss'],
})
export class CustomLoginComponent implements OnInit {
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
  }

  login(): void {
    const redirectUri = `${location.origin}/login`; // on revient sur login après Keycloak
    location.href = `${location.origin}/oauth2/authorization/oidc?redirect_uri=${redirectUri}`;
  }
}
