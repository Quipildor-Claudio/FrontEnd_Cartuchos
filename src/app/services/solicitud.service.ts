import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Solicitud } from '../models/solicitud';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  constructor(private http:HttpClient,private authService:AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/solicitudes`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Solicitud[])
    );
  }



  getOne(id:any):Observable<Solicitud>{
    return this.http.get(`${API_URI}/solicitudes/${id}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Solicitud)
    );
  }

  update(solicitud:Solicitud,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/solicitudes/${id}`,solicitud,{headers:this.authService.addAuthorizationHeader()});
  }

  getAllPage(page:number): Observable<any[]> {
    return this.http.get(`${API_URI}/solicitudes/page/${page}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map((response:any)=>response as any[])
    );
  }
  getBusquedaServicoPage(data:string,page:number): Observable<any[]> {
    return this.http.get(`${API_URI}/solicitudes/buscarPorServicio/page/${data}/${page}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map((response:any)=>response as any[])
    );
  }

  getBusquedaUsername(data:string,page:number): Observable<any[]> {
    return this.http.get(`${API_URI}/solicitudes/buscarPorUsername/page/${data}/${page}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map((response:any)=>response as any[])
    );
  }
  getBuscarFecha(fechaInicio:string,fechaFinal:string): Observable<any[]> {
    return this.http.get(`${API_URI}/solicitudes/buscarPorFecha/${fechaInicio}/${fechaFinal}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }

  getBusquedaEstado(data:string): Observable<any[]> {
    return this.http.get(`${API_URI}/solicitudes/buscarPorEstado/${data}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }
  getBusquedaServico(data:string): Observable<any[]> {
    return this.http.get(`${API_URI}/solicitudes/buscarPorServicio/${data}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }

  add(solicitud:Solicitud):Observable<any>{
    return this.http.post<any>(`${API_URI}/solicitudes`,solicitud,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/solicitudes/${id}`,{headers:this.authService.addAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire({
          title: "No se puede elinar la solicitud seleccionda.",
          icon: "error"
        });
        return throwError(e);
      })
    );;
  }

}
