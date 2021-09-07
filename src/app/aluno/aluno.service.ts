import {Injectable} from '@angular/core';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Aluno} from '../core/model';
import {FacialHttp} from '../seguranca/facial-http';
import {environment} from '../../environments/environment';

export class AlunoFiltro {
  nome: string;
  email: string;
  matricula: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  url: string;

  constructor(private http: FacialHttp) {
    this.url = `${environment.apiUrl}/aluno`;
  }

  consultar(filtro: AlunoFiltro): Promise<any> {
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
    if (filtro.matricula) {
      params = params.set('matricula', filtro.matricula);
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

  criar(aluno: Aluno): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(`${this.url}`, JSON.stringify(aluno), {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  atualizar(aluno: Aluno): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<any>(`${this.url}/${aluno.idAluno}`, JSON.stringify(aluno), {headers})
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

    return this.http.get<any>(`${this.url}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  listar(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(this.url, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  enviarFoto(aluno: Aluno, foto: any): Promise<void> {
    const headers = new HttpHeaders();

    const formData: FormData = new FormData();
    formData.append('foto', foto, foto.name);

    return this.http.post<any>(`${this.url}/${aluno.idAluno}/foto`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json'
    })
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  getFotos(aluno: Aluno): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${aluno.idAluno}/foto`, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  excluirFoto(id: any): Promise<any> {
    return this.http.delete(`${this.url}/foto/${id}`)
      .toPromise()
      .then(() => null)
      .catch(error => {
        return Promise.reject(error);
      });
  }

  salvarRostosReconhecidos(aula: any, fotos: any): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    console.log(fotos);

    return this.http.post<any>(`${this.url}/aula/${aula.id}/foto`, JSON.stringify(fotos), {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
