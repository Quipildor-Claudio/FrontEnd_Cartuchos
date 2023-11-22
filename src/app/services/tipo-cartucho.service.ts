import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { TipoCartucho } from '../models/tipo-cartucho';

@Injectable({
  providedIn: 'root'
})
export class TipoCartuchoService {
  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/tipoCartuchos`).pipe(
      map(response=>response as any[])
    );
  }
  getOne(id):Observable<TipoCartucho>{
    return this.http.get(`${API_URI}/tipoCartuchos/${id}`).pipe(
      map(response=>response as TipoCartucho)
    );
  }

  add(tipoCartucho:TipoCartucho):Observable<any>{
    return this.http.post<any>(`${API_URI}/tipoCartuchos`,tipoCartucho,{headers:this.httpheaders});
  }
  update(tipoCartucho:TipoCartucho,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/tipoCartuchos/${id}`,tipoCartucho,{headers:this.httpheaders});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/tipoCartuchos/${id}`,{headers:this.httpheaders});
  }

}
