import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProfileInterface } from '../interfaces/profile-interface';


@Injectable({
  providedIn: 'root'
})
export class GetAllUsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(index: String): Observable<any>{
    console.log(index)
    let url = "http://127.0.0.1:5000/profile/0/pagination-get"
    return this.http.get<any>(url); 
  }
}
