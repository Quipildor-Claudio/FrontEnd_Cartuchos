import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/marcas`).pipe(
      map(response=>response as any[])
    );
  }
  getOne(id):Observable<Marca>{
    return this.http.get(`${API_URI}/marcas/${id}`).pipe(
      map(response=>response as Marca)
    );
  }

  add(marca:Marca):Observable<any>{
    return this.http.post<any>(`${API_URI}/marcas`,marca,{headers:this.httpheaders});
  }
  update(marca:Marca,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/marcas/${id}`,marca,{headers:this.httpheaders});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/marcas/${id}`,{headers:this.httpheaders});
  }
}