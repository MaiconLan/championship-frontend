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

  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
