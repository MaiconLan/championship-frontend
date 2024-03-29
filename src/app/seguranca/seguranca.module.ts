import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from './login-form/login-form.component';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {AuthGuard} from './auth.guard';
import {LogoutService} from './logout.service';
import {HttpsRequestInterceptor} from './interceptor';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import {RouterModule} from '@angular/router';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginFormComponent, CadastroUsuarioComponent, RecuperarSenhaComponent, RedefinirSenhaComponent],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: environment.disallowedRoutes
      }
    }),
    RouterModule,
  ],
  providers: [
    AuthGuard,
    LogoutService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ]
})
export class SegurancaModule {
}
