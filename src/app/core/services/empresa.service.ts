import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UtilResponse } from '../interfaces/util.interface';
import { IActualizarEmpresaRequest, IEliminarEmpresaRequest, IInsertarEmpresaRequest, IListaEmpresaRequest } from '../interfaces/DTOs/Empresa/IEmpresaRequest';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  
  
  private readonly API_URL = environment.apiUrl+'/Empresa';

  constructor(
    private http: HttpClient
  ) { }

  insertarempresa(request: IInsertarEmpresaRequest): Observable<UtilResponse> {
    return this.http.post<UtilResponse>(`${this.API_URL}/insertarempresa`, request);
  }

  actualizarempresa(request: IActualizarEmpresaRequest): Observable<UtilResponse> {
    return this.http.put<UtilResponse>(`${this.API_URL}/actualizarempresa`, request);
  }
  listaempresa(request: IListaEmpresaRequest): Observable<UtilResponse> {
    const params = new HttpParams()
      .set('p_usuario', request.p_usuario);
    return this.http.get<UtilResponse>(`${this.API_URL}/listaempresa`, {params});
  }

  eliminarempresa(request: IEliminarEmpresaRequest): Observable<UtilResponse> {
    const params = new HttpParams()
      .set('p_id_empresa', request.p_id_empresa)
      .set('p_usuario', request.p_usuario);
    return this.http.delete<UtilResponse>(`${this.API_URL}/eliminarempresa`, {params});
  }
  
}
