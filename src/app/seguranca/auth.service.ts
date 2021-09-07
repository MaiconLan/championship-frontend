import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic ' + btoa('angular:angular'))
      .append('Content-Type', 'application/x-www-form-urlencoded');
    this.limparAcessToken();
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
      })
      .catch(response => {
        this.limparAcessToken();

        if (response.status === 400) {
          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  private armazenarToken(token: string): void {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  isAccessTokenInvalido(): boolean {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic ' + btoa('angular:angular'))
      .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  limparAcessToken(): void {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  getIdUsuario(): string {
    return this.jwtPayload?.idUsuario;
  }

}
