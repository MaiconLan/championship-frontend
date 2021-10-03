import {Component, OnInit} from '@angular/core';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../auth.service';
import {Aluno, Usuario} from '../../core/model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  usuario = new Usuario();
  senha: string;
  repetirSenha: string;

  constructor(private handler: ErrorHandlerService,
              private auth: AuthService,
              private router: Router,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de usuário');
  }

  cadastrar(): void {
    if (this.senha !== this.repetirSenha) {
      this.handler.addError('Senhas não conferem', 'Verifique as senhas e tente novamente');
    } else {
      this.usuario.senha = this.senha;
      this.auth.cadastrarUsuario(this.usuario).then(r => {
        this.handler.addSuccess('Sucesso', 'Cadastrado com sucesso! Redirecionando para o Login');
        setTimeout(function(): void {
          this.usuario = new Usuario();
        }.bind(this), 2);
        this.router.navigate(['/login']);
      }).catch(error => this.handler.handle(error));
    }
  }
}
