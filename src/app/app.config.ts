import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AuthService } from './auth.service';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: "AIzaSyCU4f-bUE5sM8OjVb3hTBsboJm6K_WVdho",
  authDomain: "projectcotation.firebaseapp.com",
  projectId: "projectcotation",
  storageBucket: "projectcotation.appspot.com",
  messagingSenderId: "518544517886",
  appId: "1:518544517886:web:999d78b232c71d471553af",
  measurementId: "G-PJRYQWVZ15"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      provideAuth(() => getAuth()),
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
    ]), provideAnimationsAsync()
  
  ]
};
