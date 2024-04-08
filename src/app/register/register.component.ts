import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  
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
  this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({
    next:() => {
      this.router.navigateByUrl("/");
    },
    error:(err) => {
      this.errorMessage = err.code;
    }
  })
}
}
