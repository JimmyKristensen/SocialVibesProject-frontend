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

//Test Data
let testData: Chat = {
    "Chatroom Participants": {
      "-NjRailphl3e61nbXJEF": [
        {
          "Name": "Jimmy",
          "TimeStamp": "2023-11-16 15-07-44"
        },
        {
          "Name": "Nicolas",
          "TimeStamp": "2023-11-16 15-07-53"
        }
      ]
    },
    "Chatrooms": {
      "-NjRailphl3e61nbXJEF": {
        "Admin": {
          "Name": "Nicolas",
          "TimeStamp": "2023-11-16 15-07-53"
        },
        "TimeStamp": "2023-11-17 10-27-02",
        "Title": "Test Chatroom"
      }
    },
    "Profiles": {
      "-NjNSO0NQgtX8QnAAYWz": {
        "Name": "Jimmy",
        "TimeStamp": "2023-11-16 15-07-44"
      },
      "-NjNSQ17ewaStdPzImu6": {
        "Name": "Nicolas",
        "TimeStamp": "2023-11-16 15-07-53"
      },
      "-NjNSRG1UK-t6UQ-tsb6": {
        "Name": "Timmie",
        "TimeStamp": "2023-11-16 15-07-58"
      }
    }
   };

@Injectable({
 providedIn: 'root'
})
export class InvidService {
 constructor(private http: HttpClient) { }


 //Api Return
 getInvidChats(): Observable<any> {
    console.log(testData)
    
    this.http.get('https://social-vibes-4d1d6-default-rtdb.europe-west1.firebasedatabase.app').pipe(
    tap(data => console.log('This is the data: ', data))
    ).subscribe();
    return of(testData)
    
    /*return this.http.get('https://social-vibes-4d1d6-default-rtdb.europe-west1.firebasedatabase.app').pipe(
    tap(data => console.log('This is the data: ', data))
  );*/
 }
}
