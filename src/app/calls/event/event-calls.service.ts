import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventCallsService {
 
  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any>{
    return this.http.get('http://127.0.0.1:5000/event/get-all').pipe(
      tap(data => console.log('This is the events: ', data))
    );
  }

  getAllEvent(id: string): Observable<any>{
    return this.http.get('http://127.0.0.1:5000/event/get/'+id).pipe(
      tap(data => console.log('This is the events: ', data))
    );
  }

  getUsersJoinedEvents(userid: string): Observable<any>{
    return this.http.get('http://127.0.0.1:5000/event/user-events/'+userid).pipe(
      tap(data => console.log('This is the events: ', data)),
      map((response: any) => {
          // Check if response and response.Data are defined
          if (response && response.Data) {
            // Extract the events object from the JSON response
            const eventsObject = response.Data;
        
            // Convert the Data object to an array
            const eventsArray = Object.values(eventsObject);
        
            return eventsArray;
          } else {
            console.error('Response or Event property not available.');
            return [];
          }
        }
      ));
  }

  joinEvent(eventID: string, userID: string){
    const patchUrl: string = "http://127.0.0.1:5000/event/join/" + eventID
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const body = JSON.stringify({"user_Id":  userID })
    console.log(this.http.patch<any>(patchUrl,body))
    return this.http.patch<any>(patchUrl,body, httpHeader)
  }

  leaveEvent(userID: string, eventID: string): Observable<any> {
    console.log("User id: "+userID, ", Chatroom id: "+eventID)
    const body = { user_Id: userID }; 
    return this.http.patch(`http://127.0.0.1:5000/event/leave/${eventID}`, body).pipe(
      tap((response: any) => {
        console.log(`Left event ${eventID} for user ${userID}: `, response);
      })
    );
  }

  postEvent(useriD: string, title: string, descriptions: string, adress: string, startDate: string, startTime: string, endDate: string, endTime: string, latitude: string, longitude: string){
    const postUrl: string = "http://127.0.0.1:5000/event/create-event"
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const body = JSON.stringify({
      "Latitude": latitude,
      "Longitude": longitude,
      "Description": descriptions,
      "Admin" : useriD,
      "Title": title,
      "StartDate": startDate,
      "StartTime": startTime,
      "StopDate": endDate,
      "StopTime": endTime,
      "adress": adress
    })
    return this.http.post<any>(postUrl,body, httpHeader)
  }

  formateDate(dateToConveryt: string) {
    let date = new Date(dateToConveryt);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let formattedDate = `${day}-${month}-${year}`;
    return formattedDate
  }
  
  formateTime(dateToConveryt: string){
    let date = new Date(dateToConveryt);
    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let formattedTime = `${hours}:${minutes}`;
    return formattedTime
  }
}
