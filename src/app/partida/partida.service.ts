import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {FacialHttp} from '../seguranca/facial-http';
import {environment} from '../../environments/environment';
import {PartidaFiltro} from './lista-partida/lista-partida.component';

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
}
