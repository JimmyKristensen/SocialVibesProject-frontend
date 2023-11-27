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
    return this.http.get('http://127.0.0.1:5000/chatroom/-NjNSRG1UK-t6UQ-tsb6/user-get').pipe(
      tap(data => console.log('This is the data: ', data))
    );
  }
  
}
