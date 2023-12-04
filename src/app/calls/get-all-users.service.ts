import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GetAllUsersService {

  constructor(private http: HttpClient) { }

  getAllUsersForPagination(index: String): Observable<any>{
    let url = "http://127.0.0.1:5000/profile/pagination-get/" + index
    return this.http.get<any>(url); 
  }
}
