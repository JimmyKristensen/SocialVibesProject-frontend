import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Chat variable
interface Chat {
 id: number;
 memberIds: number[];
 numberOfMessages: number;
 latestMessage: Date;
}

@Injectable({
 providedIn: 'root'
})
export class InvidCallService {

 constructor(private http: HttpClient) { }

//Observe the chat as an array
 getData(): Observable<Chat[]> {
//Return the chats as an array
 return this.http.get<Chat[]>('api.example');
 }
}
