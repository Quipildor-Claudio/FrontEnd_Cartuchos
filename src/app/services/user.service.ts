import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Impresora } from '../models/impresora';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  
  
  constructor(private http:HttpClient,
              private router:Router) { }


  private isNoAutorized(e):boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/user`).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<User>{
    return this.http.get(`${API_URI}/user/${id}`).pipe(
      map(response=>response as User)
    );
  }

  add(user:User):Observable<any>{
    return this.http.post<any>(`${API_URI}/user`,user,{headers:this.httpheaders});
  }
  update(user:User,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/user/${id}`,user,{headers:this.httpheaders});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/user/${id}`,{headers:this.httpheaders});
  }
}
