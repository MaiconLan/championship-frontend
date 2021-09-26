import {Injectable} from '@angular/core';
import {FacialHttp} from '../seguranca/facial-http';
import {environment} from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {Jogador} from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {

  url: string;

  constructor(private http: FacialHttp) {
    this.url = `${environment.apiUrl}/campeonato`;
  }

  consultar(idCampeonato: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${idCampeonato}/jogador`, {headers})
      .toPromise()
      .then(response => response)
      .catch(error => {
        return Promise.reject(error);
      });
  }

  getJogador(idCampeonato: number, idJogador: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${idCampeonato}/jogador/${idJogador}`, {headers})
      .toPromise()
      .then(response => response)
      .catch(error => {
        return Promise.reject(error);
      });
  }

  criar(idCampeonato: number, jogador: Jogador): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(`${this.url}/${idCampeonato}/jogador`, JSON.stringify(jogador), {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  atualizar(idCampeonato: number, jogador: Jogador): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<any>(`${this.url}/${idCampeonato}/jogador/${jogador.idJogador}`, JSON.stringify(jogador), {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  excluirJogador(idCampeonato: number, idJogador: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.delete<any>(`${this.url}/${idCampeonato}/jogador/${idJogador}`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
