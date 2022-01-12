import {Component, OnInit} from '@angular/core';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../auth.service';
import {Usuario} from '../../core/model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  usuario = new Usuario();
  senha: string;
  repetirSenha: string;
  editando: boolean;

  constructor(private handler: ErrorHandlerService,
              private auth: AuthService,
              private rout: ActivatedRoute,
              private router: Router,
              private title: Title) {
  }

  ngOnInit(): void {
    const idUsuario = this.rout.snapshot.params.idUsuario;

    if (idUsuario) {
      if (!this.isUsuarioLogado(idUsuario)) {
        this.router.navigate(['/pagina-nao-encontrada']);
      }
      this.title.setTitle('Perfil do usuário');
      this.buscar(idUsuario);
    } else {
      this.title.setTitle('Cadastro de usuário');
    }
  }

  isUsuarioLogado(idUsuario: string): boolean {
    return !this.auth.isAccessTokenInvalido() || this.auth.getIdUsuario() == idUsuario;
  }

  salvar(): void {
    if (this.editando) {
      if (this.senha == null || this.senha === '') {
        this.usuario.senha = null;
        this.editar();
      } else {
        this.validarSenha();
        this.editar();
      }
    } else {
      this.cadastrar();
    }
  }

  private editar(): void {
    this.auth.editarUsuario(this.usuario).then(r => {
      this.handler.addSuccess('Sucesso', 'Editado com sucesso!');
      setTimeout(function (): void {
        this.buscar();
        this.auth.jwtPayload.nome = this.usuario.nome;
      }.bind(this), 2);
      this.router.navigate(['/campeonato']);
    }).catch(error => this.handler.handle(error));
  }

  private cadastrar(): void {
    if (!this.senhaConfere()) {
      this.validarSenha();
    } else {
      this.usuario.senha = this.senha;
      this.auth.cadastrarUsuario(this.usuario).then(r => {
        this.handler.addSuccess('Sucesso', 'Cadastrado com sucesso! Redirecionando para o Login');
        setTimeout(function (): void {
          this.usuario = new Usuario();
        }.bind(this), 2);
        this.router.navigate(['/login']);
      }).catch(error => this.handler.handle(error));
    }
  }

  senhaConfere(): boolean {
    return this.senha === this.repetirSenha;
  }

  validarSenha(): void {
    if (!this.senhaConfere()) {
      this.handler.addError('Senhas não conferem', 'Verifique as senhas e tente novamente');
    }
  }

  buscar(id: number): void {
    this.editando = id != null;
    this.auth.buscarUsuario()
      .then(usuario => {
        this.usuario = usuario;
      }).catch(error => this.handler.handle(error));
  }
}
