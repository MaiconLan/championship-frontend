import {Injectable} from '@angular/core';
import {FacialHttp} from './facial-http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl: string;

  constructor(private http: FacialHttp,
              private auth: AuthService) {
    this.tokensRevokeUrl = `${environment.apiUrl}/token`;
  }

  logout(): Promise<void> {
    return this.http.delete(this.tokensRevokeUrl, {withCredentials: true})
      .toPromise()
      .then(response => {
        this.auth.limparAcessToken();
      }).catch(error => {
        return error;
      });
  }
}
