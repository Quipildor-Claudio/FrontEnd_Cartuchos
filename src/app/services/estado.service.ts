import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http:HttpClient,
              private authService:AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/estados`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }
}
