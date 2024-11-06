import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.PORT; // Cambia esto según sea necesario

  constructor(private http: HttpClient) {}

  // Método genérico para hacer POST
  post(endpoint: string, body: any): Observable<any> {
    return this.http.post<any>(`${endpoint}`, body);
  }

  // Método genérico para hacer GET
  get(endpoint: string): Observable<any> {
    return this.http.get<any>(`${endpoint}`);
  }

  // Método genérico para hacer PUT
  put(endpoint: string, body: any): Observable<any> {
    return this.http.put<any>(`${endpoint}`, body);
  }

  // Método genérico para hacer DELETE
  delete(endpoint: string): Observable<any> {
    return this.http.delete<any>(`${endpoint}`);
  }
}
