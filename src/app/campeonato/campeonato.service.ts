import { Injectable } from '@angular/core';
import {FacialHttp} from '../seguranca/facial-http';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Campeonato} from '../core/model';
import {AuthService} from "../seguranca/auth.service";

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

  constructor(private http: FacialHttp,
              private httpClient: HttpClient,
              private authService: AuthService) {
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

  listarJogadores(id: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${id}/jogador`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  buscarTabela(id: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${id}/tabela`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  compartilhar(id): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<any>(`${this.url}/${id}/compartilhamento`, {}, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  buscarTabelaCompartilhada(codigoCompartilhamento: any): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.httpClient.get<any>(`${this.url}/tabela-compartilhada/${codigoCompartilhamento}`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
