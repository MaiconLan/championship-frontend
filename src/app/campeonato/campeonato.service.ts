import { Injectable } from '@angular/core';
import {FacialHttp} from '../seguranca/facial-http';
import {environment} from '../../environments/environment';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Aluno, Campeonato} from '../core/model';

export class CampeonatoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  url: string;

  constructor(private http: FacialHttp) {
    this.url = `${environment.apiUrl}/campeonato`;
  }

  consultar(filtro: CampeonatoFiltro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get<any>(this.url, {params, headers})
      .toPromise()
      .then(response => response)
      .catch(error => {
        return Promise.reject(error);
      });
  }

  buscar(id: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  criar(campeonato: Campeonato): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(`${this.url}`, JSON.stringify(campeonato), {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  atualizar(campeonato: Campeonato): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<any>(`${this.url}/${campeonato.idCampeonato}`, JSON.stringify(campeonato), {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
