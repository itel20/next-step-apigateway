import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [BrowserModule, FontAwesomeModule, BrowserAnimationsModule, ReactiveFormsModule, LoginComponent, NgxChartsModule],
})
export class AppModule {}
