import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  // Método POST
  post(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body, { headers: this.getHeaders() });
  }

  // Método GET
  get(url: string): Observable<any> {
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  // Método PUT
  put(url: string, body: any): Observable<any> {
    return this.http.put<any>(url, body, { headers: this.getHeaders() });
  }

  // Método DELETE
  delete(url: string): Observable<any> {
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }

  // Opcional: Cabeceras para las peticiones
  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}