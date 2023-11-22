import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { TipoCarga } from '../models/tipo-carga';

@Injectable({
  providedIn: 'root'
})
export class TipoCargaService {
  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/tipoCargas`).pipe(
      map(response=>response as any[])
    );
  }
  getOne(id):Observable<TipoCarga>{
    return this.http.get(`${API_URI}/tipoCargas/${id}`).pipe(
      map(response=>response as TipoCarga)
    );
  }

  add(tipoCarga:TipoCarga):Observable<any>{
    return this.http.post<any>(`${API_URI}/tipoCargas`,tipoCarga,{headers:this.httpheaders});
  }
  update(tipoCarga:TipoCarga,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/tipoCargas/${id}`,tipoCarga,{headers:this.httpheaders});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/tipoCargas/${id}`,{headers:this.httpheaders});
  }
}
