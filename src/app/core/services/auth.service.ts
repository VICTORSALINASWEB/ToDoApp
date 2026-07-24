import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UtilResponse } from '../interfaces/util.interface';
import { ILoginRequest } from '../interfaces/DTOs/Auth/ILoginRequest';
import { IRegistroRequest } from '../interfaces/DTOs/Auth/iRegistroRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private readonly API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  register(request: IRegistroRequest): Observable<UtilResponse> {
    return this.http.post<UtilResponse>(`${this.API_URL}/register`, request);
  }
  
  login(request: ILoginRequest): Observable<UtilResponse> {
    return this.http.post<UtilResponse>(`${this.API_URL}/login`, request);
  }

}
