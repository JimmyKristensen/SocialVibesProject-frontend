import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesCallsService {

  constructor(private http: HttpClient) { }

  getAllCommunities(id: string): Observable<any>{
    const url: string = "http://127.0.0.1:5000/community/get-all-communitys/"
    return this.http.get(url + id).pipe(
      tap(data => console.log('This is the communities: ', data)),
      map((response: any) => {
        // Extract the communities object from the JSON response
        const communitiesObject = response.communities;


        // Convert the chatrooms object to an array
        const communitiesArray = Object.values(communitiesObject);

        return communitiesArray;
      })
    );
  }
}
