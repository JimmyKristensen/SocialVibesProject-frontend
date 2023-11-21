import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvidCallService {
  constructor(private http: HttpClient) { }

  getInvidChats(): Observable<any> {
    return this.http.get('https://social-vibes-4d1d6-default-rtdb.europe-west1.firebasedatabase.app').pipe(
      tap(data => console.log('This is the data: ', data))
    );
  }
  
}
