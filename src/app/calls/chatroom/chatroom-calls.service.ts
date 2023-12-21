import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NONE_TYPE } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ChatroomCallsService {
  constructor(private http: HttpClient) { }

  getChatrooms(userID: string): Observable<any[]> {
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
  
  leaveChatroom(userID: string, chatroomID: string): Observable<any> {
    console.log("User id: "+userID, ", Chatroom id: "+chatroomID)
    const body = { user_Id: userID }; 
    return this.http.patch(`http://127.0.0.1:5000/chatroom/leave-chatroom/${chatroomID}`, body).pipe(
      tap((response: any) => {
        console.log(`Left chatroom ${chatroomID} for user ${userID}: `, response);
      })
    );
  }

  getParticipants(chatroomId: string): Observable<any> {
    return this.http.get('http://127.0.0.1:5000/chatroom/get/' + chatroomId).pipe(
      map((chatroomData: any) => {
        const { Chatroom, Participants } = chatroomData.chatroom_data;
  
        // Extract the admin and participants separately
        const { Admin, Title } = Chatroom;
        const participants = Participants.filter((participant: any) => participant.id !== Admin.id);
        const updatedParticipants = [...participants, Admin]; // Include admin in participants
  
        return { chatroomId, admin: Admin, participants: updatedParticipants, title: Title };
      }),
      tap((result: any) => {
        console.log('Chatroom data for chatroomId ' + result.chatroomId + ': ', result);
      })
    );
  }
  
  
}
