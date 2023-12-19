import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NONE_TYPE } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ChatroomCallsService {
  constructor(private http: HttpClient) { }

  getAllChatrooms(data: any): Observable<any[]> {
    const chatroomIds: string[] = data.chatroom_ids;
  
    const observables: Observable<any>[] = chatroomIds.map(user_id => {
      return this.http.get('http://127.0.0.1:5000/chatroom/get/' + user_id).pipe(
        tap((chatroomData: any) => {
          console.log('Chatroom data for user_id ' + user_id + ': ', chatroomData);
        })
      );
    });
  
    return forkJoin(observables);
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
}
