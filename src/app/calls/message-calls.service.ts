import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageCallsService {

  constructor(private http: HttpClient) { }

  getChatMessages(chatID: string): Observable<any[]> {
    return this.http.get('http://127.0.0.1:5000/chatroom/get-messages/' + chatID).pipe(
      tap(data => console.log('This is the users: ', data)),
      map((response: any) => {
        // Extract the values of the messages object to create an array
        const messagesArray = Object.values(response.messages);
  
        // If messagesArray is not defined or is not an array, return an empty array
        return Array.isArray(messagesArray) ? messagesArray : [];
      })
    );
  }
  sendMessages(message: string, chatID: string): Observable<void> {
    const body = { message: message };

    return this.http.post<void>('http://127.0.0.1:5000/message/send-message/' + chatID, body);
  }
}
