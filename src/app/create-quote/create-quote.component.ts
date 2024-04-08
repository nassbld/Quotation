import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuoteService } from '../quote.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-create-quote',
  standalone: true,
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  providers: [
    AuthService,
    QuoteService,
  ],
})
export class CreateQuoteComponent implements OnInit {
  fb = inject(FormBuilder);
  imageFile: any = null;
  imageUrl: string | null = null;
  authService = inject(AuthService)
  router = inject(Router);
  quoteService = inject(QuoteService);
  errorMessage: string | null = null;
  userId: string | null = null;
  isLoading: boolean = false;
  ngOnInit(): void{
    this.authService.user$.subscribe(user => {
      if(user){
        console.log(user.email, "ng on init")
        this.userId = user.email;
      }else{
        this.router.navigateByUrl("/")
      }
    }) 
  }



  form = this.fb.nonNullable.group({
    description: ["", Validators.required],
    image: ['', Validators.required],
  });

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    if (this.imageFile) {
      this.isLoading = true;
      this.quoteService.createQuote({ clientId: this.userId, description: rawForm.description, file: this.imageFile }).subscribe({
        next:() => {
          this.router.navigateByUrl("/success")
        }
      })
    }
    /*     this.quoteService.createQuote({description:rawForm.description}).subscribe({
          next:() => {
            this.router.navigateByUrl("/create-quote");
          },
          error:(err) => {
            this.errorMessage = err.code;
          }
        }) */
  }


  logout(): void {
    this.authService.logout();
  }
}
