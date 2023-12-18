import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  setUser(userID: string): Observable<any>{
    
    return this.http.get('http://127.0.0.1:5000/profile/get/'+userID).pipe(
      tap(data => console.log('The saved user: ', data))
    );
}
}
