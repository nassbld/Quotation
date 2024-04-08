import { Injectable, inject, signal } from "@angular/core";
import { Firestore, addDoc, collection } from "@angular/fire/firestore";
import { Observable, from } from "rxjs";
import { Storage, ref, uploadBytesResumable,getDownloadURL } from '@angular/fire/storage';

interface QuoteInterface {
  clientId?: string | null;
  description: string | null;
  image?: string | null;
  quotation?: number | null;
}
@Injectable({
  providedIn: 'root'
})

export class QuoteService {
  firestore = inject(Firestore);
  storage = inject(Storage)
  quoteCollection = collection(this.firestore, 'quote');

/*   createQuote(quote: QuoteInterface): Observable<void> {
    const promise = addDoc(this.quoteCollection, quote).then((response: any) => response.id);
    return from(promise)
  } */

  createQuote(quote:any): Observable<string> {
    return new Observable(observer => {
      const storageRef = ref(this.storage, quote.file.name);
      const uploadImage = uploadBytesResumable(storageRef, quote.file);
  
      uploadImage.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          observer.error(error); // Emit error if upload fails
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            addDoc(this.quoteCollection, { description: quote.description, image: downloadURL, clientId: quote.clientId })
              .then((response: any) => {
                observer.next(response.id); // Emit the ID of the uploaded document
                observer.complete(); // Complete the observable
              })
              .catch(error => {
                observer.error(error); // Emit error if adding document fails
              });
          });
        }
      );
    });
  }

}