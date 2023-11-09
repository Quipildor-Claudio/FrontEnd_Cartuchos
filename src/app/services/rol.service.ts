import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Impresora } from '../models/impresora';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  
  
  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/roles`).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<Impresora>{
    return this.http.get(`${API_URI}/roles/${id}`).pipe(
      map(response=>response as Impresora)
    );
  }

  add(rol:Rol):Observable<any>{
    return this.http.post<any>(`${API_URI}/roles`,rol,{headers:this.httpheaders});
  }
  update(rol:Rol,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/roles/${id}`,rol,{headers:this.httpheaders});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/roles/${id}`,{headers:this.httpheaders});
  }
}
