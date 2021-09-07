import {Injectable, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // return next.handle(req);
    return this.addIdUsuario(req, next);
  }

  addIdUsuario(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const idUsuario = this.authService.getIdUsuario();

    if (idUsuario) {
      const dupReq = req.clone({
        headers: req.headers.set('idUsuario', `${idUsuario}`)
      });
      return next.handle(dupReq);
    } else {

      return next.handle(req);
    }
  }
}

