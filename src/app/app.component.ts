import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {AuthService} from './seguranca/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'championship-frontend';
  appVersion: string;
  apiVersion: string;
  apiError = true;
  color: string;
  apiColorcolor: string;

  constructor(private primengConfig: PrimeNGConfig,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.appVersion = '1.5.2';
    this.color = 'blue';
    this.apiColorcolor = 'cian';

    this.auth.getApiVersion().then(response => {
      this.apiVersion = response.version;
      this.apiVersion = `https://img.shields.io/badge/Vers%C3%A3o Api-${this.apiVersion}-${this.apiColorcolor}`;
      this.apiError = false;
      console.log('TESTE');
    }).catch(error => {
      console.log('Erro ', error);
      this.apiError = true;
    });

    this.appVersion = `https://img.shields.io/badge/Vers%C3%A3o App-${this.appVersion}-${this.color}`;
    this.primengConfig.ripple = true;
  }
}
