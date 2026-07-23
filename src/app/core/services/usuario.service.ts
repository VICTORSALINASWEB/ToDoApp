import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormularioLogin } from '../interfaces';
import { Observable } from 'rxjs';
import { UtilResponse } from '../interfaces/util.interface';
import { ILoginRequest } from '../interfaces/DTOs/Auth/ILoginRequest';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private readonly API_URL = environment.apiUrl+'/Usuario';

  constructor(
    private http: HttpClient
  ) { }

  listaUsuarioAdministrativo(): Observable<UtilResponse> {
    return this.http.get<UtilResponse>(`${this.API_URL}/listausuarioadministrativo`,{});
  }

}
