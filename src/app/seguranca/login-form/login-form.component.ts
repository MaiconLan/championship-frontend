import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {ErrorHandlerService} from '../../core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(private auth: AuthService,
              private handler: ErrorHandlerService,
              private router: Router) {
  }

  login(usuario: string, senha: string): void {
    this.auth.login(usuario, senha)
      .then(() => {
        this.router.navigate(['dashboard']);
      })
      .catch(error => {
      this.handler.handle(error);
    });
  }

}
