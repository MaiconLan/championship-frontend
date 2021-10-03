import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'championship-frontend';
  appVersion: string;
  color: string;

  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.appVersion = '1.5.0';
    this.color = 'blue';

    this.appVersion = `https://img.shields.io/badge/Vers%C3%A3o-${this.appVersion}-${this.color}` ;
    this.primengConfig.ripple = true;
  }
}
