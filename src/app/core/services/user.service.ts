import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  apiUrl:string='http://localhost:3000/api/user/'
  signup(userData:any){
      return this.http.post<any>(`${this.apiUrl}signup`,userData)
  }
  getUser(){
    return this.http.get<any>(`${this.apiUrl}getalluser`)
  }
}
