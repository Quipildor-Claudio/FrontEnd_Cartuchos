import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    
  constructor(private http:HttpClient,
              private router:Router,
              private authService:AuthService
              ) { }


  private isNoAutorized(e):boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/user`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<User>{
    return this.http.get(`${API_URI}/user/${id}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as User)
    );
  }

  getUserbyName(name:string):Observable<User>{
    return this.http.get(`${API_URI}/user/userbyname/${name}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as User)
    );
  }

  add(user:User):Observable<any>{
    return this.http.post<any>(`${API_URI}/user`,user,{headers:this.authService.addAuthorizationHeader()});
  }
  update(user:User,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/user/${id}`,user,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/user/${id}`,{headers:this.authService.addAuthorizationHeader()});
  }
}
