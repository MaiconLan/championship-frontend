import { Injectable } from '@angular/core';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {FacialHttp} from "../seguranca/facial-http";
import {environment} from "../../environments/environment";
import {Coordenador} from "../core/model";
import {CoordenadorFiltro} from "./lista-coordenador/lista-coordenador.component";

@Injectable({
  providedIn: 'root'
})
export class CoordenadorService {

  url: string;

  constructor(private http: FacialHttp) {
    this.url = `${environment.apiUrl}/coordenador`;
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

  criar(coordenador: Coordenador): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(`${this.url}`, JSON.stringify(coordenador), {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  atualizar(coordenador: Coordenador): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<any>(`${this.url}/${coordenador.idCoordenador}`, JSON.stringify(coordenador), {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  consultar(filtro: CoordenadorFiltro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
    if (filtro.email) {
      params = params.set('email', filtro.email);
    }

    return this.http.get<any>(this.url, {params, headers})
      .toPromise()
      .then(response => response)
      .catch(error => {
        return Promise.reject(error);
      });
  }

  excluir(id: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.delete(`${this.url}/${id}`, {headers})
      .toPromise()
      .then(() => null)
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
