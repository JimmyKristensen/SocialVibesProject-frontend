import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GetAllUsersService {

  constructor(private http: HttpClient) { }

  getAllUsersForPagination(index: String): Observable<any>{
    let url = "http://127.0.0.1:5000/profile/pagination-get/" + index
    return this.http.get<any>(url); 
  }

  getAllUsers(): Observable<any>{
    return this.http.get('http://127.0.0.1:5000/profile/get-all-profiles').pipe(
      tap(data => console.log('This is the users: ', data))
    );
  }
}
