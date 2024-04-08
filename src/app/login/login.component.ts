import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  providers: [
    AuthService,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  
  form = this.fb.nonNullable.group({
    username:["", Validators.required],
    email: ['', Validators.required],
    password: ["", Validators.required],
  });
  
  errorMessage:string | null = null;
  
  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email,  rawForm.password).subscribe({
      next:() => {
        this.router.navigateByUrl("/create-quote");
      },
      error:(err) => {
        this.errorMessage = err.code;
      }
    })
  }
}
