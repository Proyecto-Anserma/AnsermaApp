import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario, TokenResponse } from '../modelos/usuario.model';
import { environment } from '../../environments/environment';
import { TOKEN } from '../../environments/api-costant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      // Aquí podrías decodificar el token JWT si necesitas la información del usuario
      // this.currentUserSubject.next(usuarioDecodificado);
    }
  }

  login(username: string, password: string): Observable<TokenResponse> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password)
      .set('scope', '')
      .set('client_id', 'string')
      .set('client_secret', 'string');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<TokenResponse>(TOKEN.CONSULTAR_TODO, body.toString(), { headers })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.access_token);
          // Aquí podrías decodificar el token y establecer el usuario actual
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}