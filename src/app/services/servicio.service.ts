import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Impresora } from '../models/impresora';
import { Servicio } from '../models/servicio';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  
  
  constructor(private http:HttpClient,private authService:AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/servicios`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<Impresora>{
    return this.http.get(`${API_URI}/servicios/${id}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Impresora)
    );
  }

  add(servicio:Servicio):Observable<any>{
    return this.http.post<any>(`${API_URI}/servicios`,servicio,{headers:this.authService.addAuthorizationHeader()});
  }
  update(servicio:Servicio,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/servicios/${id}`,servicio,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/servicios/${id}`,{headers:this.authService.addAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire({
          title: "No se puede elinar el servicio seleccionado.",
          icon: "error"
        });
        return throwError(e);
      })
    );;
  }
}
