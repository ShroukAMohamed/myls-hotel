import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, RouterModule, FloatLabelModule, InputTextModule, TranslateModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  constructor(public AuthService: AuthService) { }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(`^[A-Za-z0-9]{6,15}$`)]),
  })

  submitLoginForm(loginForm: FormGroup) {
    console.log(loginForm.value.email)
    // this.AuthService.saveData()
    if (loginForm.valid) {
      this.AuthService.login(loginForm.value.email, loginForm.value.password)
    }
  }
}
