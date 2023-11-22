import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/estados`).pipe(
      map(response=>response as any[])
    );
  }
  getOne(id):Observable<Estado>{
    return this.http.get(`${API_URI}/estados/${id}`).pipe(
      map(response=>response as Estado)
    );
  }

  add(estado:Estado):Observable<any>{
    return this.http.post<any>(`${API_URI}/estados`,estado,{headers:this.httpheaders});
  }
  update(estado:Estado,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/estados/${id}`,estado,{headers:this.httpheaders});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/estados/${id}`,{headers:this.httpheaders});
  }
}
