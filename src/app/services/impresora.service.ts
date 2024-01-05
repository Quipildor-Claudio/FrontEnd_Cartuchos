import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Impresora } from '../models/impresora';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ImpresoraService {
  
  
  constructor(private http:HttpClient,private authService:AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/impresoras`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<Impresora>{
    return this.http.get(`${API_URI}/impresoras/${id}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Impresora)
    );
  }

  add(impresora:Impresora):Observable<any>{
    return this.http.post<any>(`${API_URI}/impresoras`,impresora,{headers:this.authService.addAuthorizationHeader()});
  }
  update(impresora:Impresora,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/impresoras/${id}`,impresora,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/impresoras/${id}`,{headers:this.authService.addAuthorizationHeader()});
  }

  getImpresoraMarcaAndModelo(nombre:string,modelo:string): Observable<any[]> {
    return this.http.get(`${API_URI}/buscar-impresora/${nombre}/${modelo}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }
}
