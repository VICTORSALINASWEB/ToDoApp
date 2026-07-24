import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilResponse } from '../interfaces/util.interface';
import { IRegistroTareaRequest } from '../interfaces/DTOs/Tarea/iRegistroTareaRequest';
import { IEditarTareaRequest } from '../interfaces/DTOs/Tarea/iEditarTareaRequest';
import { ICompletarTareaRequest } from '../interfaces/DTOs/Tarea/iCompletarTareaRequest';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  
    private readonly API_URL = environment.apiUrl+'/tasks';
  
    constructor(
      private http: HttpClient
    ) { }
  
    listaTarea(): Observable<UtilResponse> {
      return this.http.get<UtilResponse>(`${this.API_URL}`);
    }
    
    registroTarea(request: IRegistroTareaRequest): Observable<UtilResponse> {
      return this.http.post<UtilResponse>(`${this.API_URL}/register`, request);
    }

    editarTarea(request: IEditarTareaRequest,iIdTarea: number): Observable<UtilResponse> {
      return this.http.put<UtilResponse>(`${this.API_URL}`+'/'+`${iIdTarea}`, request);
    }
    
    completarTarea(request: ICompletarTareaRequest,iIdTarea: number): Observable<UtilResponse> {
      return this.http.patch<UtilResponse>(`${this.API_URL}`+'/'+`${iIdTarea}`+'/completar', request);
    }

        
    eliminarTarea(iIdTarea: number): Observable<UtilResponse> {
      return this.http.delete<UtilResponse>(`${this.API_URL}`+'/'+`${iIdTarea}`);
    }
  
}
