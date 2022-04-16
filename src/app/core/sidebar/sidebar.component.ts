import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../seguranca/auth.service';
import {LogoutService} from '../../seguranca/logout.service';
import {ErrorHandlerService} from '../error-handler.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  exibindoMenu: boolean;
  appVersion: string;
  apiVersion: string;
  apiError = true;
  color: string;
  apiColorcolor: string;

  constructor(public authService: AuthService,
              private logoutService: LogoutService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.appVersion = '1.5.5';
    this.color = 'blue';
    this.apiColorcolor = 'navy';

    this.auth.getApiVersion().then(response => {
      this.apiVersion = response.version;
      this.apiVersion = `https://img.shields.io/badge/Vers%C3%A3o Api-${this.apiVersion}-${this.apiColorcolor}`;
      this.apiError = false;
    }).catch(error => {
      this.apiError = true;
    });

    this.appVersion = `https://img.shields.io/badge/Vers%C3%A3o App-${this.appVersion}-${this.color}`;
  }

  logout(): void {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['login']);
      })
      .catch(error => {
      this.errorHandler.handle(error);
    });
  }

  mostrarBotaoMenu(): boolean {
    if (this.authService.isAccessTokenInvalido()) {
      this.exibindoMenu = false;
      return false;
    }
    return true;
  }

}
