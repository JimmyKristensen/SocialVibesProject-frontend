import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { getRenderingRef } from 'ionicons/dist/types/stencil-public-runtime';

//Chat requirements
  interface User {
    Name: string;
    TimeStamp: string;
  }
 
  interface Admin {
    Name: string;
    TimeStamp: string;
  }
 
  interface Chatroom {
    Admin: Admin;
    TimeStamp: string;
    Title: string;
  }
 
  interface Chat {
    "Chatroom Participants": Record<string, User[]>;
    "Chatrooms": Record<string, Chatroom>;
    "Profiles": Record<string, User>;
  }
@Injectable({
  providedIn: 'root'
})
export class CreateChatService {

  constructor(private http: HttpClient) {}
  
  /*
  "Chatrooms": {
    "-NjRnEvNpSpQM3CtYPRA": {
      "Admin": {
        "Name": "Nicolas",
        "TimeStamp": "2023-11-16  15-07-53",
        "id": "-NjNSQ17ewaStdPzImu6"
      },
      "TimeStamp": "2023-11-17  11-21-44",
      "Title": "Test Chatroom"
    }
    */
}
