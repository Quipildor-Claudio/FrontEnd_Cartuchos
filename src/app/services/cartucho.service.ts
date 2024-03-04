import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Cartucho } from '../models/cartucho';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class CartuchoService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/cartuchos`, { headers: this.authService.addAuthorizationHeader() }).pipe(
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
    return this.http.get(`${API_URI}/cartuchos/page/${page}`, { headers: this.authService.addAuthorizationHeader() }).pipe(
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

  getOne(id): Observable<Cartucho> {
    return this.http.get(`${API_URI}/cartuchos/${id}`, { headers: this.authService.addAuthorizationHeader() }).pipe(
      map(response => response as Cartucho),
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

  add(cartucho: Cartucho): Observable<any> {
    return this.http.post<any>(`${API_URI}/cartuchos`, cartucho, { headers: this.authService.addAuthorizationHeader() })
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
  update(cartucho: Cartucho, id: number): Observable<any> {
    return this.http.put<any>(`${API_URI}/cartuchos/${id}`, cartucho, { headers: this.authService.addAuthorizationHeader() })
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
    return this.http.delete<any>(`${API_URI}/cartuchos/${id}`, { headers: this.authService.addAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (this.authService.isNoAutorizado(e)) {
            return throwError(e);
          }

          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire({
            title: "No se puede eliminar el cartucho seleccionado el mismo se en encuntra en varias solicitudes.",
            icon: "error"
          });
          return throwError(e);
        })
      );
  }


  getCartuchoMarcaAndModelo(nombre: string, modelo: string): Observable<Cartucho[]> {
    return this.http.get(`${API_URI}/buscar-cartucho/${nombre}/${modelo}`, { headers: this.authService.addAuthorizationHeader() }).pipe(
      map(response => response as Cartucho[]),
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

  getCartuchoModelo(modelo: string): Observable<Cartucho[]> {
    return this.http.get(`${API_URI}/cartucho-modelo/${modelo}`, { headers: this.authService.addAuthorizationHeader() }).pipe(
      map(response => response as Cartucho[]),
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
