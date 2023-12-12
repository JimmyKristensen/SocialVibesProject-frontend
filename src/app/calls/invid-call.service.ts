import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvidCallService {
  constructor(private http: HttpClient) { }

  getInvidChats(userID: string): Observable<any[]> {
    return this.http.get('http://127.0.0.1:5000/chatroom/user-get/' + userID).pipe(
      tap(data => console.log('This is the data: ', data)),
      map((response: any) => {
        // Extract the chatrooms object from the JSON response
        const chatroomsObject = response.chatrooms;


        // Convert the chatrooms object to an array
        const chatroomsArray = Object.values(chatroomsObject);

        return chatroomsArray;
      })
    );
  }
  }
  
