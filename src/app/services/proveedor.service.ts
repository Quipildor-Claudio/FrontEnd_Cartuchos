import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';
import { Observable, catchError, throwError,map } from 'rxjs';
import { API_URI } from 'config/config';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})

export class ProveedorService {

  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) { }


  getAll(): Observable<Proveedor[]> {
    return this.http.get(`${API_URI}/proveedor`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Proveedor[]),
      catchError(e => {
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
 
    );
  }

  getOne(id):Observable<Proveedor>{
    return this.http.get(`${API_URI}/proveedor/${id}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Proveedor),
      catchError(e => {
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
 

    );
  }

  add(proveedor:Proveedor):Observable<any>{
    return this.http.post<any>(`${API_URI}/proveedor`,proveedor,{headers:this.authService.addAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
 
    );
  }
  update(proveedor:Proveedor,id:number):Observable<Proveedor>{
    return this.http.put<any>(`${API_URI}/cartuchos/${id}`,Proveedor,{headers:this.authService.addAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
 
    );
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/proveedor/${id}`,{headers:this.authService.addAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
 
    );
  }

}
