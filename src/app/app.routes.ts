import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateQuoteComponent } from './create-quote/create-quote.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'create-quote', component:CreateQuoteComponent},
    {path: 'success', component:SuccessComponent},

];
