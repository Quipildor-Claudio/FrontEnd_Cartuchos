import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Persona } from '../models/persona';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  
  
  constructor(private http:HttpClient,private authService:AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/personas`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<Persona>{
    return this.http.get(`${API_URI}/personas/${id}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Persona)
    );
  }
  
  getDni(dni):Observable<Persona>{
    return this.http.get(`${API_URI}/pordni/${dni}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Persona)
    );
  }
  getListaDni(dni):Observable<Persona[]>{
      return  this.http.get(`${API_URI}/constrainDni/${dni}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
        map(response=>response as Persona[])
      );
  }

  add(persona:Persona):Observable<any>{
    return this.http.post<any>(`${API_URI}/personas`,persona,{headers:this.authService.addAuthorizationHeader()});
  }
  update(persona:Persona,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/personas/${id}`,persona,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/personas/${id}`,{headers:this.authService.addAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire({
          title: "No se puede elinar el archivo seleccionado.",
          icon: "error"
        });
        return throwError(e);
      })
    );;
  }
}
