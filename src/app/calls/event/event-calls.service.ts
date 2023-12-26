import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventCallsService {

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any>{
    return this.http.get('http://127.0.0.1:5000/event/get-all').pipe(
      tap(data => console.log('This is the events: ', data))
    );
  }

  getAllEvent(id: string): Observable<any>{
    return this.http.get('http://127.0.0.1:5000/event/get/'+id).pipe(
      tap(data => console.log('This is the events: ', data))
    );
  }

  joinEvent(eventID: string, userID: string){
    const postUrl: string = "http://127.0.0.1:5000/event/join/" + eventID
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const body = JSON.stringify({"user_Id":  userID })
    console.log(this.http.patch<any>(postUrl,body))
    return this.http.patch<any>(postUrl,body, httpHeader)
  }
}
