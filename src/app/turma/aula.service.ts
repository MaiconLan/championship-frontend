import { Injectable } from '@angular/core';
import {FacialHttp} from "../seguranca/facial-http";
import {environment} from "../../environments/environment";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  url: string;

  constructor(private http: FacialHttp) {
    this.url = `${environment.apiUrl}/aula`;
  }

  buscar(idAula: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${idAula}`, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  reconhecer(aula: any, foto: any): Promise<any> {
    const headers = new HttpHeaders();
    const formData: FormData = new FormData();
    formData.append('foto', foto, 'captura.png');

    return this.http.post<any>(`${this.url}/${aula.id}/reconhecimento`, formData, {
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

  buscarNaoReconhecidos(aula: any): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.get<any>(`${this.url}/${aula.id}/reconhecimento/nao-reconhecido`, {headers})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }

  exportarAula(aula: any): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<any>(`${this.url}/${aula.id}/exportacao`, {headers}, {responseType: 'blob'})
      .toPromise()
      .then()
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
