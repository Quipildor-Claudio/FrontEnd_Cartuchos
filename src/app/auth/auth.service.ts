import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URI } from 'config/config';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = {
    'username': "",
    'role': "",
    'name': ""
  }

  private _token: string;
  private httpheaders = new HttpHeaders({ 'content-type': 'application/json' });

  constructor(private http: HttpClient,
    public router: Router,
  ) { }



  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(user: User): Observable<any> {

    return this.http.post<any>(`${API_URI}/login`, user, { headers: this.httpheaders });
  }

  saveUser(accessToken: string): void {
    let payload = this.getDataToken(accessToken);
    //console.log(payload);
    this._user.username = payload.username;
    this._user.role = this.convertAuthorities(payload.authorities);


    sessionStorage.setItem('userSession', JSON.stringify(this._user));
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  getDataToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(window.atob(accessToken.split(".")[1]));
    }
    return null;
  }

  getUserSession(): any {
    return JSON.parse(sessionStorage.getItem('userSession'));
  }
  getToken(): any {
    return sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    let payload = this.getDataToken(this.token);
    if (payload != null && payload.username && payload.username.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
  }
  addAuthorizationHeader() {
    let token = this.getToken();
    if (token != null) {
      return this.httpheaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpheaders;
  }

  convertAuthorities(inputString: any): string {

    const parsedArray = JSON.parse(inputString);

    if (Array.isArray(parsedArray) && parsedArray.length === 1) {
      const authorityValue = parsedArray[0]?.authority;
      return authorityValue;
    }
    return null;

  }

  public isNoAutorizado(e): boolean {
    if (e.status == 401) {

      if (this.isAuthenticated()) {
        this.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      if (this.isAuthenticated()) {
        this.logout();
      }
      Swal.fire('Acceso denegado', `Hola ${this._user.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }
}
