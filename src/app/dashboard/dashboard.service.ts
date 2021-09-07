import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  urlAluno = environment.apiUrl + '/aluno/dashboard';
  urlProfessor = environment.apiUrl + '/professor/dashboard';
  urlAulas = environment.apiUrl + '/turma/dashboard';

  constructor(private http: HttpClient) { }

  getAlunoDashboard(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.urlAluno}`, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  getProfessorDashboard(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.urlProfessor}`, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  getAulasDashboard(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.urlAulas}`, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
