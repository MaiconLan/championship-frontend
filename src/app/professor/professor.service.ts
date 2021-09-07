import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Aluno, Professor} from '../core/model';
import {environment} from '../../environments/environment';

export class ProfessorFiltro {
  nome: string;
  email: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/professor`;
  }

  consultar(filtro: ProfessorFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    if (filtro.email) {
      params = params.set('email', filtro.email);
    }

    return this.http.get<any>(this.url, {headers, params})
      .toPromise()
      .then(response => response)
      .catch(error => {
      return Promise.reject('Erro ao consultar professores');
    });
  }

  listar(): Promise<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.get<any>(this.url, {headers})
      .toPromise()
      .then(response => response)
      .catch(error => {
        return Promise.reject('Erro ao consultar professores');
      });
  }

  excluir(id: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.delete(`${this.url}/${id}`, {headers })
      .toPromise()
      .then(() => null)
      .catch(error => {
        return Promise.reject(error);
      });
  }

  criar(professor: Professor): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(`${this.url}`, JSON.stringify(professor), {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

    atualizar(professor: Professor): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<any>(`${this.url}/${professor.idProfessor}`, JSON.stringify(professor), {headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  buscar(id: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${id}`, { headers  })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
