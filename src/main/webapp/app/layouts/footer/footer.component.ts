import { Component } from '@angular/core';
import { TranslateDirective } from 'app/shared/language';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'jhi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [TranslateDirective, FaIconComponent],
})
export default class FooterComponent {}
