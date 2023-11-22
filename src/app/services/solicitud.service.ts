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

  getBuscarFecha(fechaInicio:string,fechaFinal:string): Observable<any[]> {
    return this.http.get(`${API_URI}/solicitudes/buscarPorFecha/${fechaInicio}/${fechaFinal}`,{headers:this.httpheaders}).pipe(
      map(response=>response as any[])
    );
  }


  add(solicitud:Solicitud):Observable<any>{
    return this.http.post<any>(`${API_URI}/solicitudes`,solicitud,{headers:this.httpheaders});
  }
}
