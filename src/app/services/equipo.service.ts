import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Equipo } from '../models/equipo';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/equipo`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<Equipo>{
    return this.http.get(`${API_URI}/equipo/${id}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Equipo)
    );
  }

  add(equipo:Equipo):Observable<any>{
    return this.http.post<any>(`${API_URI}/equipo`,equipo,{headers:this.authService.addAuthorizationHeader()});
  }

  update(equipo:Equipo,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/equipo/${id}`,equipo,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/equipo/${id}`,{headers:this.authService.addAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire({
          title: "No se puede eliminar el equipo.",
          icon: "error"
        });
        return throwError(e);
      })
    );;
  }

}
