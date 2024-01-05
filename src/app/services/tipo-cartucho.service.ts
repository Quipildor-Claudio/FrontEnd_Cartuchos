import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { TipoCartucho } from '../models/tipo-cartucho';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TipoCartuchoService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/tipoCartuchos`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }
  
  add(tipoCartucho:TipoCartucho):Observable<any>{
    return this.http.post<any>(`${API_URI}/tipoCartuchos`,tipoCartucho,{headers:this.authService.addAuthorizationHeader()});
  }
  update(tipoCartucho:TipoCartucho,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/tipoCartuchos/${id}`,tipoCartucho,{headers:this.authService.addAuthorizationHeader()});
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/tipoCartuchos/${id}`,{headers:this.authService.addAuthorizationHeader()});
  }
}
