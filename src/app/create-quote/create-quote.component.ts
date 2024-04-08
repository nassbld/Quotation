import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-quote',
  standalone: true,
  imports: [],
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.scss',
  providers: [
    AuthService,
  ],
})
export class CreateQuoteComponent {
  authService = inject(AuthService);

  logout():void{
    this.authService.logout();
  }
}
