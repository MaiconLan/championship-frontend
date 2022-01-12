import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent implements OnInit {

  constructor(private auth: AuthService,
              private handler: ErrorHandlerService,
              private title: Title,
              private router: Router,
              private rout: ActivatedRoute) {
  }

  novaSenha: string;
  codigoRecuperacao: string;

  ngOnInit(): void {
    this.title.setTitle('Redefinir Senha');

    this.codigoRecuperacao = this.rout.snapshot.params.codigoRecuperacao;
  }

  redefinir(): void {
    this.auth.redefinir(this.novaSenha, this.codigoRecuperacao)
      .then(response => {
        this.handler.addSuccess('Sucesso', 'Conta recuperada com sucesso.');
        this.router.navigate(['/login']);
      }).catch(error => {
      this.handler.handle(error);
    });
  }

}
