import { Router } from '@angular/router';
import { AuthModel, LoginModel, RegisterModel, registerModelSend, TokenModel } from './../models/authModel';
import { Injectable } from '@angular/core';
import { AuthHttpService } from './auth-http.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = new BehaviorSubject({} as TokenModel);
  token$ = this.token.asObservable();

  constructor(private _http: AuthHttpService) {
    this.token.next(this.getTokenLocalstorage());
  }

  login(user: LoginModel) {
    return this._http.login(user);
  }

  private getTokenLocalstorage() {
    let local = localStorage.getItem('token');
    if (local) {
      return JSON.parse(local);
    } else {
      return {} as TokenModel;
    }
  }

  getToken() {
    return this.token.value;
  }

  setToken(token: TokenModel) {
    localStorage.setItem('token', JSON.stringify(token));
    this.token.next(this.getTokenLocalstorage());
  }

  removeToken() {
    localStorage.removeItem('token');
    this.token.next(this.getTokenLocalstorage());
  }

  logout() {
    return this._http.logout(this.token.value);
  }

  private transformRegisterModel(registerModel: RegisterModel): registerModelSend {
    return {
      email: registerModel.email,
      nombre: registerModel.nombre,
      password: registerModel.password,
      password_confirmation: registerModel.password_confirmation,
      apellidos: registerModel.apellidos,
      fecha_nacimiento: registerModel.fecha_nacimiento,
      direccion:
        registerModel.calle +
        ' ' +
        registerModel.numero +
        ' ' +
        registerModel.ciudad +
        ' ' +
        registerModel.codigo_postal,
      telefono: registerModel.telefono,
    };
  }

  register(user: RegisterModel): Observable<AuthModel> {
    let usuario = this.transformRegisterModel(user);
    return this._http.register(usuario);
  }
}
