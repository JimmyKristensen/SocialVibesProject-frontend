import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Chat requirements
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

// Test Data
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
  constructor() { }

  // Api Return
  getInvidChats(): Observable<any> {
    console.log(testData);
    return of({
      "Chatroom Participants": testData["Chatroom Participants"],
      "Chatrooms": testData.Chatrooms
    });
  }
}
