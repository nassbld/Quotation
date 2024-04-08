import { Injectable, inject, signal } from "@angular/core";
import {Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user} from "@angular/fire/auth";
import { Observable, from } from "rxjs";


interface UserInterface {
    email: string|null;
    username:string|null;
  }
@Injectable({
    providedIn: 'root'
})

export class AuthService {
    
    fireBaseAuth = inject(Auth)
    user$ = user(this.fireBaseAuth);
    currentUserSig = signal<UserInterface | null | undefined>(undefined);

    register(email:string,username:string,password:string):Observable<void>{
        const promise = createUserWithEmailAndPassword(this.fireBaseAuth,email, password ).then(
            response => updateProfile(response.user, {displayName: username})
        );
        return from(promise)
    }

    login(email:string,password:string):Observable<void>{
        const promise = signInWithEmailAndPassword(
            this.fireBaseAuth,
            email,
            password
        ).then(() => {

        })
        return from(promise);
    }

    logout():Observable<void>{
        const promise = signOut(this.fireBaseAuth);
        return from(promise);
    }

}