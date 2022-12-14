import { usuarioModel } from 'src/app/auth/models/authModel';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { usuarioPaginateModel } from '../models/usuarioModel';

@Injectable({
  providedIn: 'root',
})
export class UsuariosHttpService {
  headers: HttpHeaders;
  bearer: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.bearer = 'Bearer ' + this.authService.getToken().access_token;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.bearer,
    });
  }

  getUsuarios(page: string = null!): Observable<usuarioPaginateModel> {
    return this.http.get<usuarioPaginateModel>(environment.apiUrl + 'usuarios/getUsuarios', { headers: this.headers });
  }

  getUsuariosPaginate(page: string): Observable<usuarioPaginateModel> {
    return this.http.get<usuarioPaginateModel>(page, {
      headers: this.headers,
    });
  }

  searchUsuarios(): Observable<usuarioModel[]> {
    return this.http.get<usuarioModel[]>(environment.apiUrl + 'usuarios/searchUsuarios', {
      headers: this.headers,
    });
  }
}
