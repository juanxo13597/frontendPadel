import { usuarioModel } from 'src/app/auth/models/authModel';
import { UsuariosHttpService } from './usuarios-http.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { usuarioPaginateModel } from '../models/usuarioModel';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private usuarioService: UsuariosHttpService) {}

  getUsuarios(): Observable<usuarioPaginateModel> {
    return this.usuarioService.getUsuarios();
  }

  getUsuariosPaginate(page: string): Observable<usuarioPaginateModel> {
    return this.usuarioService.getUsuariosPaginate(page);
  }

  searchUsuarios(): Observable<usuarioModel[]> {
    return this.usuarioService.searchUsuarios();
  }
}
