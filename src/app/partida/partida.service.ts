import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {FacialHttp} from '../seguranca/facial-http';
import {environment} from '../../environments/environment';
import {PartidaFiltro} from './lista-partida/lista-partida.component';
import {Partida, Pontuacao} from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  url: string;

  constructor(private http: FacialHttp) {
    this.url = `${environment.apiUrl}/campeonato`;
  }

  consultar(idCampeonato: number, filtro: PartidaFiltro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${idCampeonato}/partida`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  buscar(idCampeonato: number, id: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${idCampeonato}/partida/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  buscarPontuacoes(idCampeonato: number, id: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${idCampeonato}/partida/${id}/pontuacao`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  salvarPontuacao(idCampeonato: number, idPartida: number, pontuacao: Pontuacao): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<any>(`${this.url}/${idCampeonato}/partida/${idPartida}/pontuacao/jogador/${pontuacao.idJogador}`,
      JSON.stringify(pontuacao), {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  criar(idCampeonato: number, partida: Partida): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(`${this.url}/${idCampeonato}/partida`, JSON.stringify(partida), {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  atualizar(idCampeonato: number, partida: Partida): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<any>(`${this.url}/${idCampeonato}/partida/${partida.idPartida}`, JSON.stringify(partida), {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
