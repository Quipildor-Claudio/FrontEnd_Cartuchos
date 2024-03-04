import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Impresora } from '../models/impresora';
import { Rol } from '../models/rol';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  
  constructor(private http:HttpClient,private authService:AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/roles`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<Impresora>{
    return this.http.get(`${API_URI}/roles/${id}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Impresora)
    );
  }

  add(rol:Rol):Observable<any>{
    return this.http.post<any>(`${API_URI}/roles`,rol,{headers:this.authService.addAuthorizationHeader()});
  }
  update(rol:Rol,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/roles/${id}`,rol,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/roles/${id}`,{headers:this.authService.addAuthorizationHeader()});
  }
}
