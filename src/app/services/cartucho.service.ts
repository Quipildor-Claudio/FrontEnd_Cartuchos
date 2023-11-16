import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Cartucho } from '../models/cartucho';

@Injectable({
  providedIn: 'root'
})

export class CartuchoService {
  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/cartuchos`).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<Cartucho>{
    return this.http.get(`${API_URI}/cartuchos/${id}`).pipe(
      map(response=>response as Cartucho)
    );
  }

  add(cartucho:Cartucho):Observable<any>{
    return this.http.post<any>(`${API_URI}/cartuchos`,cartucho,{headers:this.httpheaders});
  }
  update(cartucho:Cartucho,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/cartuchos/${id}`,cartucho,{headers:this.httpheaders});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/cartuchos/${id}`,{headers:this.httpheaders});
  }


  getCartuchoMarcaAndModelo(nombre:string,modelo:string): Observable<any[]> {
    return this.http.get(`${API_URI}/buscar-cartucho/${nombre}/${modelo}`,{headers:this.httpheaders}).pipe(
      map(response=>response as any[])
    );
  }
}
