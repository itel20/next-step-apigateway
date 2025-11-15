import { Component, OnInit, Renderer2, RendererFactory2, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import dayjs from 'dayjs/esm';

import { AccountService } from 'app/core/auth/account.service';
import { Authority } from 'app/config/authority.constants';
import { AppPageTitleStrategy } from 'app/app-page-title-strategy';

import FooterComponent from '../footer/footer.component';
import PageRibbonComponent from '../profiles/page-ribbon.component';
import NavbarComponent from '../navbar/navbar.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'jhi-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [AppPageTitleStrategy],
  imports: [
    RouterOutlet,
    FooterComponent,
    PageRibbonComponent,
    NavbarComponent, // ✅ Navbar importé
    FormsModule,
    CommonModule,
  ],
})
export default class MainComponent implements OnInit {
  isChatbotPageVar = false;
  isAdminRoleVar = false;

  private renderer: Renderer2;
  private router = inject(Router);
  private appPageTitleStrategy = inject(AppPageTitleStrategy);
  private accountService = inject(AccountService);
  private translateService = inject(TranslateService);
  private rootRenderer = inject(RendererFactory2);

  constructor() {
    this.renderer = this.rootRenderer.createRenderer(document.querySelector('html'), null);
  }

  ngOnInit(): void {
    // ⚡ Tenter la connexion automatique si déjà authentifié
    this.accountService.identity().subscribe();

    // 🔄 Changement de langue
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.appPageTitleStrategy.updateTitle(this.router.routerState.snapshot);
      dayjs.locale(event.lang);
      this.renderer.setAttribute(document.querySelector('html'), 'lang', event.lang);
    });

    // 🔍 Détecter chatbot page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isChatbotPageVar = event.urlAfterRedirects.startsWith('/chatbot');
      }
    });

    // ⚡ Détecter rôle admin
    this.accountService.getAuthenticationState().subscribe(account => {
      this.isAdminRoleVar = account?.authorities.includes(Authority.ADMIN) ?? false;
    });
  }

  // 🔑 Détection login page
  isLoginPage(): boolean {
    return this.router.url.startsWith('/login'); // robuste si Keycloak redirige vers /login?code=...
  }

  // ✅ Getter admin pour le template
  get isAdminRole(): boolean {
    return this.isAdminRoleVar;
  }

  // ✅ Getter chatbot pour le template
  get isChatbotPage(): boolean {
    return this.isChatbotPageVar;
  }
}
