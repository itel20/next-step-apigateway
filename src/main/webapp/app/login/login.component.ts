import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service'; // Correct import
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'jhi-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Avec ton LoginService actuel, la méthode login ne prend pas de paramètres
      this.loginService.login();
      this.router.navigate(['/home']);
    }
  }

  onLogout(): void {
    this.loginService.logout();
  }
}
