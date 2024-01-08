import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { TipoImpresora } from '../models/tipo-impresora';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TipoImpresoraService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/tipoImpresora`,{headers:this.authService.addAuthorizationHeader()}).pipe(map(response=>response as any[])
    );
  }
  
  add(tipoImpresora:TipoImpresora):Observable<any>{
    return this.http.post<any>(`${API_URI}/tipoImpresora`,tipoImpresora,{headers:this.authService.addAuthorizationHeader()});
  }
  update(tipoImpresora:TipoImpresora,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/tipoImpresora/${id}`,tipoImpresora,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/tipoImpresora/${id}`,{headers:this.authService.addAuthorizationHeader()});
  }
}
