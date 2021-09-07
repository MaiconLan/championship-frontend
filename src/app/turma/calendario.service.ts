import {Injectable} from '@angular/core';
import {FacialHttp} from "../seguranca/facial-http";
import {environment} from "../../environments/environment";
import {HttpHeaders} from "@angular/common/http";
import {Aula} from "../core/model";

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  url: string;

  constructor(private http: FacialHttp) {
    this.url = `${environment.apiUrl}/turma`;
  }

  getAulas(idTurma: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${idTurma}/aula`, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }


  criarAula(idTurma: number, aula: Aula): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(`${this.url}/${idTurma}/aula`, aula, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  editarAula(aula: Aula): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<any>(`${this.url}/aula/${aula.id}`, aula, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  excluirAula(aula: Aula): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.delete<any>(`${this.url}/aula/${aula.id}`, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
