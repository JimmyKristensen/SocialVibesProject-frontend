import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError} from 'rxjs';


interface ParticipantsInterface {
  Participants: string[];
  Admin: string;
  Title: string;
}
@Injectable({
  providedIn: 'root'
})
export class CreateChatService {
  URLForApi: string = 'http://127.0.0.1:5000/chatroom/create-chat';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {}
  
  addChatRoom(participants : ParticipantsInterface): Observable<ParticipantsInterface>{
    console.log(this.URLForApi)
    console.log(participants)
    console.log(this.httpHeader)
    console.log(this.http.post<ParticipantsInterface>(this.URLForApi, participants))
    return this.http.post<ParticipantsInterface>(this.URLForApi, participants)
    .pipe(catchError(this.handleError('addHero', participants))
  );
  }
  handleError(arg0: string, participants: ParticipantsInterface): (err: any, caught: Observable<ParticipantsInterface>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }
  
}
