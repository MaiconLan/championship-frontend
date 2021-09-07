import {Injectable} from '@angular/core';
import {FacialHttp} from "../seguranca/facial-http";
import {environment} from "../../environments/environment";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Turma} from "../core/model";
import {ExportacaoFiltro} from "../exportacao/exportar-aulas/exportar-aulas.component";

export class TurmaFiltro {
  materia: string;
  periodo: string;
  tipo: string;
  finalizada: boolean;
  pagina = 0;
  itensPorPagina = 10;
}


@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  url: string;

  constructor(private http: FacialHttp) {
    this.url = `${environment.apiUrl}/turma`;
  }

  consultar(filtro: TurmaFiltro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.materia) {
      params = params.set('materia', filtro.materia);
    }
    if (filtro.tipo) {
      params = params.set('tipo', filtro.tipo);
    }
    if (filtro.periodo) {
      params = params.set('periodo', filtro.periodo);
    }
    if (filtro.finalizada) {
      params = params.set('finalizada', String(filtro.finalizada));
    }

    return this.http.get<any>(`${this.url}/filtro`, {headers, params})
      .toPromise()
      .then()
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

  criar(turma: Turma): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(this.url, turma, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  atualizar(turma: Turma): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<any>(`${this.url}/${turma.idTurma}`, turma, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  buscar(id: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${id}`, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  excluir(id: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.delete<any>(`${this.url}/${id}`, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  exportar(filtro: ExportacaoFiltro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<any>(`${this.url}/${filtro.idTurma}/exportacao?formato=${filtro.formato}`, {headers}, {responseType: 'blob'})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
