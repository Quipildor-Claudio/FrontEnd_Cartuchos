import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Cartucho } from '../models/cartucho';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class CartuchoService {
  constructor(private http:HttpClient,private authService:AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/cartuchos`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<Cartucho>{
    return this.http.get(`${API_URI}/cartuchos/${id}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Cartucho)
    );
  }

  add(cartucho:Cartucho):Observable<any>{
    return this.http.post<any>(`${API_URI}/cartuchos`,cartucho,{headers:this.authService.addAuthorizationHeader()});
  }
  update(cartucho:Cartucho,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/cartuchos/${id}`,cartucho,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/cartuchos/${id}`,{headers:this.authService.addAuthorizationHeader()});
  }


  getCartuchoMarcaAndModelo(nombre:string,modelo:string): Observable<Cartucho[]> {
    return this.http.get(`${API_URI}/buscar-cartucho/${nombre}/${modelo}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Cartucho[])
    );
  }

  getCartuchoModelo(modelo:string): Observable<Cartucho[]> {
    return this.http.get(`${API_URI}/cartucho-modelo/${modelo}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Cartucho[])
    );
  }
}
