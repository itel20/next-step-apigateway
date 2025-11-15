import { Component, Injector, OnInit, inject, signal, createNgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import SharedModule from 'app/shared/shared.module';
import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import { loadNavbarItems, loadTranslationModule } from 'app/core/microfrontend';
import NavbarItem from './navbar-item.model';

@Component({
  standalone: true,
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterModule, SharedModule],
})
export default class NavbarComponent implements OnInit {
  // === États généraux ===
  inProduction?: boolean;
  openAPIEnabled?: boolean;
  version = '';
  languages = LANGUAGES;
  isNavbarCollapsed = signal(true);
  entitiesNavbarItems: NavbarItem[] = [];
  nextstepsenegalEntityNavbarItems: NavbarItem[] = [];

  // === Données utilisateur ===
  account = inject(AccountService).trackCurrentAccount();
  isAdminRole = signal(false);
  isUserRole = signal(false);

  // === Services ===
  private readonly accountService = inject(AccountService);
  private readonly loginService = inject(LoginService);
  private readonly translateService = inject(TranslateService);
  private readonly stateStorageService = inject(StateStorageService);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);

  constructor() {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {
    this.entitiesNavbarItems = EntityNavbarItems;

    this.profileService.getProfileInfo().subscribe(info => {
      this.inProduction = info.inProduction;
      this.openAPIEnabled = info.openAPIEnabled;
    });

    // 🔍 Vérifie les rôles dès que l'utilisateur est connecté
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        const roles = account.authorities;
        this.isAdminRole.set(roles.includes('ROLE_ADMIN'));
        this.isUserRole.set(roles.includes('ROLE_USER'));

        // ✅ Redirige automatiquement les admins vers leur tableau de bord
        if (this.isAdminRole()) {
          this.router.navigate(['/admin/dashboard']);
        }
      } else {
        // Utilisateur déconnecté → redirection vers la page d'accueil publique
        this.isAdminRole.set(false);
        this.isUserRole.set(false);
        this.router.navigate(['/']);
      }

      this.loadMicrofrontendsEntities();
    });
  }

  // === Méthodes utilitaires ===
  changeLanguage(languageKey: string): void {
    this.stateStorageService.storeLocale(languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed.set(true);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed.update(value => !value);
  }

  login(): void {
    this.loginService.login();
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['/']);
  }
  isLoginPage(): boolean {
    return this.router.url.startsWith('/login');
  }

  accountExists(): boolean {
    return !!this.account();
  }

  isAdmin(): boolean {
    return this.isAdminRole();
  }

  isUser(): boolean {
    return this.isUserRole();
  }

  async loadMicrofrontendsEntities(): Promise<void> {
    try {
      const items = await loadNavbarItems('nextstepsenegal');
      this.nextstepsenegalEntityNavbarItems = items;

      const LazyTranslationModule = await loadTranslationModule('nextstepsenegal');
      createNgModule(LazyTranslationModule, this.injector);
    } catch {
      // silencieux
    }
  }
}
