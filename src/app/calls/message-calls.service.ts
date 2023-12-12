import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

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

  sendMessages(message: string, chatID: string, senderID: string): Observable<string> {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('senderID', senderID);
    console.log("Sending message: "+message + " From: "+senderID + " To Chatroom: "+chatID)
    // Make the HTTP POST request
    return this.http.post<any>('http://127.0.0.1:5000/message/send-message/' + chatID, formData).pipe(
      tap(
        () => console.log('Message sent successfully!'),
        (error) => console.error('Error sending message:', error)
      ),
      catchError((error) => {
        console.error('Error sending message:', error);
        return throwError('Failed to send message');
      })
    );
}
}
