import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Nouveau import pour HttpClient moderne
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, LoginComponent, FontAwesomeModule, NgxChartsModule],
  providers: [
    provideHttpClient(), // <-- remplace HttpClientModule
  ],
})
export class AppModule {}
