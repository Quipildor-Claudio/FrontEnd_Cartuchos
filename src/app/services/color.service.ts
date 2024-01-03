import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';
import { Color } from '../models/color';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  constructor(private http:HttpClient,private authService:AuthService)  { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/colores`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as any[])
    );
  }
  
  getOne(id): Observable<Color> {
    return this.http.get(`${API_URI}/colores/${id}`,{headers:this.authService.addAuthorizationHeader()}).pipe(
      map(response=>response as Color)
    )
  };

  add(color:Color):Observable<any>{
    return this.http.post<any>(`${API_URI}/colores`,color,{headers:this.authService.addAuthorizationHeader()});
  };
  update(color:Color,id:number):Observable<any>{
    return this.http.put<any>(`${API_URI}/colores/${id}`,color,{headers:this.authService.addAuthorizationHeader()});
  };

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${API_URI}/colores/${id}`,{headers:this.authService.addAuthorizationHeader()});
  };
}
