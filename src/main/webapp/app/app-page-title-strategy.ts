import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AppPageTitleStrategy extends TitleStrategy {
  private routerState!: RouterStateSnapshot;

  constructor(
    private readonly title: Title,
    private readonly translateService: TranslateService,
  ) {
    super();
    this.translateService.onLangChange.subscribe(() => this.updateTitle(this.routerState));
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    this.routerState = routerState;
    const title = this.buildTitle(routerState) ?? 'global.title';
    this.translateService.get(title).subscribe(translatedTitle => {
      this.title.setTitle(translatedTitle);
      document.querySelector('html')?.setAttribute('lang', this.translateService.currentLang);
    });
  }
}
