import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Title} from "@angular/platform-browser";
import {ErrorHandlerService} from "../../core/error-handler.service";

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  email: any;

  constructor(private auth: AuthService,
              private handler: ErrorHandlerService,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Recuperar Conta');
  }

  recuperar(): void {
    this.auth.recuperar(this.email)
      .then(response => {
      this.handler.addSuccess('Sucesso', 'Um e-mail para recuperar sua senha foi enviado.');
    }).catch(error => {
      this.handler.handle(error);
    });
  }
}
