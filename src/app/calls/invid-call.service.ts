import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvidCallService {
  constructor(private http: HttpClient) { }

  getInvidChats(userID: String): Observable<any> {
    return this.http.get('http://127.0.0.1:5000/chatroom/user-get/'+userID).pipe(
      tap(data => console.log('This is the data: ', data))
    );
  }
  
}
