import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http:HttpClient, private authService:AuthService) { }
 
  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/ticket`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }

  getOne(id):Observable<Ticket>{
    return this.http.get(`${API_URI}/ticket/${id}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Ticket)
    );
  }

  add(ticket:Ticket):Observable<any>{
    return this.http.post<any>(`${API_URI}/ticket`,ticket,{headers:this.authService.addAuthorizationHeader()});
  }

  update(ticket:Ticket,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/ticket/${id}`,ticket,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/ticket/${id}`,{headers:this.authService.addAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire({
          title: "No se puede eliminar el soporte tecnico.",
          icon: "error"
        });
        return throwError(e);
      })
    );;
  }
}
