import {Component, OnInit} from '@angular/core';
import {Jogador} from '../../core/model';
import {JogadorService} from '../jogador.service';
import {NgForm} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ErrorHandlerService} from '../../core/error-handler.service';

@Component({
  selector: 'app-cadastro-jogador',
  templateUrl: './cadastro-jogador.component.html',
  styleUrls: ['./cadastro-jogador.component.css']
})
export class CadastroJogadorComponent implements OnInit {

  loading: boolean;
  idCampeonato: number;

  jogador = new Jogador();

  constructor(private jogadorService: JogadorService,
              private messageService: MessageService,
              private rout: ActivatedRoute,
              private router: Router,
              private title: Title,
              private confirmation: ConfirmationService,
              private handler: ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de jogador');
    this.idCampeonato = this.rout.snapshot.params.idCampeonato;
    const idJogador = this.rout.snapshot.params.idJogador;
    console.log('campeonato: ', this.idCampeonato);

    if (idJogador) {
      this.buscar(idJogador);
    }
  }

  buscar(id: number): void {
    this.loading = true;
    this.jogadorService.getJogador(this.idCampeonato, id)
      .then(jogador => {
        this.jogador = jogador;
        this.loading = false;
      }).catch(error => this.handler.handle(error));
  }

  salvar(): void {
    if (this.editando()) {
      this.atualizar();
    } else {
      this.criar();
    }
  }

  criar(): void {
    this.jogadorService.criar(this.idCampeonato, this.jogador).then(jogador => {
      this.handler.addSuccess('Criado', 'Registro criado com sucesso');
      this.router.navigate(['campeonato', this.idCampeonato]);
    }).catch(error => {
      this.handler.handle(error);
    });
  }

  atualizar(): void {
    this.jogadorService.atualizar(this.idCampeonato, this.jogador).then(jogador => {
      this.handler.addSuccess('Atualizado', 'Registro atualizado com sucesso');
      this.router.navigate(['campeonato', this.idCampeonato]);
    }).catch(error => {
      this.handler.handle(error);
    });
  }

  editando(): boolean {
    return Boolean(this.jogador.idJogador);
  }

  novo(f: NgForm): void {
    this.jogador = new Jogador();
    f.reset();
    this.router.navigate(['campeonato', this.idCampeonato, 'jogador', 'novo']);
  }

}
