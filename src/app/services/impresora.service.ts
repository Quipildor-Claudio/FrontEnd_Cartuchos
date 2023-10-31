import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'config/config';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImpresoraService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/impresoras`).pipe(
      map(response=>response as any[])
    );
  }
}
