import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilResponse } from '../interfaces/util.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  
    private readonly API_URL = environment.apiUrl+'/Utilitario';
  
    constructor(
      private http: HttpClient
    ) { }
    
    listautilsuperadministrador(): Observable<UtilResponse> {
      return this.http.get<UtilResponse>(`${this.API_URL}/listautilsuperadministrador`, {});
    }
  
}
