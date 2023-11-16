import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
 providedIn: 'root'
})
export class InvidCallService {

 constructor(private http: HttpClient) { }

 getData() {
   return this.http.get('api.example');
 }
}
