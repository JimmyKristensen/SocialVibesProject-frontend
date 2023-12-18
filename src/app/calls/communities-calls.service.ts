import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesCallsService {

  constructor(private http: HttpClient) { }

  getAllCommunities(id: string): Observable<any>{
    const getUrl: string = "http://127.0.0.1:5000/community/get-all-communitys/"
    return this.http.get(getUrl + id).pipe(
      tap(data => console.log('This is the communities: ', data)),
      map((response: any) => {
        // Check if response and response.Chatrooms are defined
        if (response && response.Chatrooms) {
          // Extract the communities object from the JSON response
          const communitiesObject = response.Chatrooms;
      
          // Convert the chatrooms object to an array
          const communitiesArray = Object.values(communitiesObject);
      
          return communitiesArray;
        } else {
          console.error('Response or Chatrooms property not available.');
          return [];
        }
      }
    ));
  }

  joinCommunity(communityID: string, userID: string){
    const postUrl: string = "http://127.0.0.1:5000/community/join-community/" + communityID
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const body = JSON.stringify({"user_Id":  userID })
    console.log(this.http.post<any>(postUrl,body))
    return this.http.post<any>(postUrl,body, httpHeader)
  }
}
