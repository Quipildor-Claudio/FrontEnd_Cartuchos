import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Marca } from '../models/marca';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {


  constructor(private http:HttpClient,private authService:AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/marcas`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }

  add(marca:Marca):Observable<any>{
    return this.http.post<any>(`${API_URI}/marcas`,marca,{headers:this.authService.addAuthorizationHeader()});
  }
  update(marca:Marca,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/marcas/${id}`,marca,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/marcas/${id}`,{headers:this.authService.addAuthorizationHeader()});
  }
}



