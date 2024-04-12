import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { API_URI } from 'config/config';
import Swal from 'sweetalert2';
import { Equipo } from '../models/equipo';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/equipo`, { headers: this.authService.addAuthorizationHeader() }).pipe(
      map(response => response as any[]),
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

  getAllPage(page: number): Observable<any[]> {
    return this.http.get(`${API_URI}/equipo/page/${page}`, { headers: this.authService.addAuthorizationHeader() }).pipe(
      map((response: any) => response as any[]),
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

  getOne(id): Observable<Equipo> {
    return this.http.get(`${API_URI}/equipo/${id}`, { headers: this.authService.addAuthorizationHeader() }).pipe(
      map(response => response as Equipo),
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

  add(equipo: Equipo): Observable<any> {
    return this.http.post<any>(`${API_URI}/equipo`, equipo, { headers: this.authService.addAuthorizationHeader() })
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
  update(equipo:Equipo, id: number): Observable<any> {
    return this.http.put<any>(`${API_URI}/equipo/${id}`, equipo, { headers: this.authService.addAuthorizationHeader() })
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

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URI}/equipo/${id}`, { headers: this.authService.addAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (this.authService.isNoAutorizado(e)) {
            return throwError(e);
          }

          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire({
            title: "No se puede eliminar el archivo seleccionado el mismo se en encuntra en varias solicitudes.",
            icon: "error"
          });
          return throwError(e);
        })
      );
  }

}
