import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageCallsService {
  sendUrl: string = 'http://127.0.0.1:5000/message/send-message';


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


  
  sendMessages(message: string, chatID: string, senderID: string): void {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('senderID', senderID);
   
    console.log(`Sending message: ${message} From: ${senderID} To Chatroom: ${chatID}`);
   
    this.http.post(`${this.sendUrl}/${chatID}`, formData).pipe(
      tap(data => console.log('Data:', data)),
      catchError(error => {
        console.error('There was an error!', error);
        return throwError(
          'Something bad happened; please try again later.');
      })
    ).subscribe();
   }
   
  }
