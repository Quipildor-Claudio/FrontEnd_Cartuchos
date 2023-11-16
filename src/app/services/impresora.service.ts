import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Impresora } from '../models/impresora';

@Injectable({
  providedIn: 'root'
})

export class ImpresoraService {
  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  
  
  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/impresoras`).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<Impresora>{
    return this.http.get(`${API_URI}/impresoras/${id}`).pipe(
      map(response=>response as Impresora)
    );
  }

  add(impresora:Impresora):Observable<any>{
    return this.http.post<any>(`${API_URI}/impresoras`,impresora,{headers:this.httpheaders});
  }
  update(impresora:Impresora,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/impresoras/${id}`,impresora,{headers:this.httpheaders});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/impresoras/${id}`,{headers:this.httpheaders});
  }

  getImpresoraMarcaAndModelo(nombre:string,modelo:string): Observable<any[]> {
    return this.http.get(`${API_URI}/buscar-impresora/${nombre}/${modelo}`,{headers:this.httpheaders}).pipe(
      map(response=>response as any[])
    );
  }
}
