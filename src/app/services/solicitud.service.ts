import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });
  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/solicitudes`).pipe(
      map(response=>response as any[])
    );
  }


  getOne(id:any):Observable<Solicitud>{
    return this.http.get(`${API_URI}/solicitudes/${id}`).pipe(
      map(response=>response as Solicitud)
    );
  }

  update(solicitud:Solicitud,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/solicitudes/${id}`,solicitud,{headers:this.httpheaders});
  }


  getBuscarFecha(fechaInicio:string,fechaFinal:string): Observable<any[]> {
    return this.http.get(`${API_URI}/solicitudes/buscarPorFecha/${fechaInicio}/${fechaFinal}`,{headers:this.httpheaders}).pipe(
      map(response=>response as any[])
    );
  }

  getBusquedaEstado(data:string): Observable<any[]> {
    return this.http.get(`${API_URI}/solicitudes/buscarPorEstado/${data}`).pipe(
      map(response=>response as any[])
    );
  }


  add(solicitud:Solicitud):Observable<any>{
    return this.http.post<any>(`${API_URI}/solicitudes`,solicitud,{headers:this.httpheaders});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/solicitudes/${id}`,{headers:this.httpheaders});
  }

}
