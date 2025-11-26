import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
// Nouveau import pour HttpClient moderne
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LoginComponent,
    FontAwesomeModule,
    NgxChartsModule,
  ],
  providers: [
    provideHttpClient(), // <-- remplace HttpClientModule
  ],
})
export class AppModule {}
