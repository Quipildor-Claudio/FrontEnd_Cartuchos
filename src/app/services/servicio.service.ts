import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Impresora } from '../models/impresora';
import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  
  
  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/servicios`).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<Impresora>{
    return this.http.get(`${API_URI}/servicios/${id}`).pipe(
      map(response=>response as Impresora)
    );
  }

  add(servicio:Servicio):Observable<any>{
    return this.http.post<any>(`${API_URI}/servicios`,servicio,{headers:this.httpheaders});
  }
  update(servicio:Servicio,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/servicios/${id}`,servicio,{headers:this.httpheaders});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/servicios/${id}`,{headers:this.httpheaders});
  }
}
