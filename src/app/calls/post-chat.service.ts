import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParticipantsInterface } from '../interfaces/participants-interface';


@Injectable({
  providedIn: 'root'
})
export class PostChatService {
  URLForApi: string = 'http://127.0.0.1:5000/chatroom/create-chat';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {}
  
  addChatRoom(participants : ParticipantsInterface){
    console.log(this.URLForApi)
    console.log(participants)
    console.log(this.httpHeader)
    console.log(this.http.post<ParticipantsInterface>(this.URLForApi, participants))
    return this.http.post<ParticipantsInterface>(this.URLForApi, participants, this.httpHeader)
  }

}
