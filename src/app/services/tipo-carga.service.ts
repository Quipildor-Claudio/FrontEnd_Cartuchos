import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TipoCarga } from '../models/tipo-carga';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TipoCargaService {
  constructor(private http:HttpClient,private authService:AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/tipoCargas`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }

  
  add(tipoCarga:TipoCarga):Observable<any>{
    return this.http.post<any>(`${API_URI}/tipoCargas`,tipoCarga,{headers:this.authService.addAuthorizationHeader()});
  }
  update(tipoCarga:TipoCarga,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/tipoCargas/${id}`,tipoCarga,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/tipoCargas/${id}`,{headers:this.authService.addAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire({
          title: "No se puede elinar el cartucho seleccionado el mismo se en encuntra en varias solicitudes.",
          icon: "error"
        });
        return throwError(e);
      })
    );;
  }
}
