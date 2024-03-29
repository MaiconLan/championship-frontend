import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {Usuario} from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  usuarioUrl: string;
  healthCheckUrl: string;
  jwtPayload: any;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.usuarioUrl = `${environment.apiUrl}/usuario`;
    this.healthCheckUrl = `${environment.apiUrl}/health-check`;
    this.carregarToken();
  }

  private getHeadersUrlEncoded(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'Basic ' + btoa('angular:angular'))
      .append('Content-Type', 'application/x-www-form-urlencoded');
  }

  private getBasicAuthHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'Basic ' + btoa('angular:angular'))
      .append('Content-Type', 'application/json');
  }

  private getHeadersJson(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'Basic ' + btoa('angular:angular'))
      .append('Content-Type', 'application/json');
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = this.getHeadersUrlEncoded();

    this.limparAcessToken();
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body,
      {headers, withCredentials: true})
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
    const headers = this.getHeadersUrlEncoded();

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body,
      {headers, withCredentials: true})
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response.error);
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

  cadastrarUsuario(usuario: Usuario): Promise<any> {
    const headers = this.getHeadersJson();

    return this.http.post<any>(`${this.usuarioUrl}/cadastro`, JSON.stringify(usuario),
      {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  getApiVersion(): Promise<any> {
    const headers = this.getHeadersJson();

    return this.http.get<any>(`${this.healthCheckUrl}/version`,
      {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  buscarUsuario(): Promise<any> {
    const headers = this.getHeadersJson();

    return this.http.get<any>(`${this.usuarioUrl}`,
      {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  editarUsuario(usuario: Usuario): Promise<any> {
    const headers = this.getHeadersJson();

    return this.http.put<any>(`${this.usuarioUrl}/${usuario.idUsuario}`, JSON.stringify(usuario),
      {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  recuperar(email: any): Promise<any> {
    const headers = this.getBasicAuthHeaders();
    const body = {email};

    return this.http.post<any>(`${this.usuarioUrl}/recuperar`, JSON.stringify(body),
      {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  redefinir(novaSenha: string, codigoRecuperacao: string): Promise<any> {
    const headers = this.getBasicAuthHeaders();
    const body = {novaSenha, codigoRecuperacao};

    return this.http.post<any>(`${this.usuarioUrl}/redefinir`, JSON.stringify(body),
      {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
