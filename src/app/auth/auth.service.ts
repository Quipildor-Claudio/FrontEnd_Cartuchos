import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URI } from 'config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string;
  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  constructor(private http:HttpClient,
              ) { }

  login(user:User):Observable<any>{

    return this.http.post<any>(`${API_URI}/login`,user,{headers:this.httpheaders});
  }
}
