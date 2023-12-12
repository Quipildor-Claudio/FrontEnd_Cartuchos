import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Impresora } from '../models/impresora';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  
  
  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/personas`).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<Persona>{
    return this.http.get(`${API_URI}/personas/${id}`).pipe(
      map(response=>response as Persona)
    );
  }
  
  getDni(dni):Observable<Persona>{
    return this.http.get(`${API_URI}/pordni/${dni}`).pipe(
      map(response=>response as Persona)
    );
  }
  getListaDni(dni):Observable<Persona[]>{
      return  this.http.get(`${API_URI}/constrainDni/${dni}`).pipe(
        map(response=>response as Persona[])
      );
  }

  add(persona:Persona):Observable<any>{
    return this.http.post<any>(`${API_URI}/personas`,persona,{headers:this.httpheaders});
  }
  update(persona:Persona,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/personas/${id}`,persona,{headers:this.httpheaders});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/personas/${id}`,{headers:this.httpheaders});
  }
}
