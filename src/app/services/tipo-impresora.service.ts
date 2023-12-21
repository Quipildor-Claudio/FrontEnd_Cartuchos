import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { TipoImpresora } from '../models/tipo-impresora';

@Injectable({
  providedIn: 'root'
})
export class TipoImpresoraService {

  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/tipoImpresora`).pipe(
      map(response=>response as any[])
    );
  }
  
  add(tipoImpresora:TipoImpresora):Observable<any>{
    return this.http.post<any>(`${API_URI}/tipoImpresora`,tipoImpresora,{headers:this.httpheaders});
  }
  update(tipoImpresora:TipoImpresora,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/tipoImpresora/${id}`,tipoImpresora,{headers:this.httpheaders});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/tipoImpresora/${id}`,{headers:this.httpheaders});
  }
}
