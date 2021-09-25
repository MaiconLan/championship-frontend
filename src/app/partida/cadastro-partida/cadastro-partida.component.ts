import {Component, OnInit} from '@angular/core';
import {Partida, Pontuacao} from '../../core/model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {PartidaService} from '../partida.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-cadastro-partida',
  templateUrl: './cadastro-partida.component.html',
  styleUrls: ['./cadastro-partida.component.css']
})
export class CadastroPartidaComponent implements OnInit {

  partida = new Partida();
  pontuacoes = [];

  pontuacao = new Pontuacao();

  quantidadePontuacoes = 0;

  loading = false;
  idCampeonato: number;
  modalEditar = false;
  statusPontuacao = [
    {label: 'Vitória', value: true},
    {label: 'Derrota', value: false},
  ];

  constructor(private messageService: MessageService,
              private partidaService: PartidaService,
              private rout: ActivatedRoute,
              private router: Router,
              private title: Title,
              private confirmation: ConfirmationService,
              private handler: ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de jogador');
    this.idCampeonato = this.rout.snapshot.params.idCampeonato;
    const idPartida = this.rout.snapshot.params.idPartida;

    if (idPartida) {
      this.loading = true;
      this.buscar(idPartida);
    }
  }

  salvar(): void {
    if (this.editando()) {
      this.atualizar();
    } else {
      this.criar();
    }
  }

  atualizar(): void {
    this.partidaService.atualizar(this.idCampeonato, this.partida)
      .then(response => {
        this.partida = response;
        this.buscarPontuacoes(this.partida.idPartida);
      }).catch(error => {
      this.handler.handle(error);
      this.loading = false;
    });
  }

  criar(): void {
    this.partidaService.criar(this.idCampeonato, this.partida)
      .then(response => {
        this.partida = response;
        this.buscarPontuacoes(this.partida.idPartida);
      }).catch(error => {
      this.handler.handle(error);
      this.loading = false;
    });
  }

  editando(): boolean {
    return Boolean(this.partida.idPartida);
  }

  novaPartida(form: NgForm): void {
    form.reset();

    setTimeout(function(): void {
      this.partida = new Partida();
    }.bind(this), 1);

    this.router.navigate(['campeonato', this.idCampeonato, 'partida', 'novo']);
  }

  buscar(id: number): void {
    this.partidaService.buscar(this.idCampeonato, id)
      .then(response => {
        this.title.setTitle('Edição de Partida');
        this.partida = this.converter(response);
        this.buscarPontuacoes(id);
      }).catch(error => {
      this.handler.handle(error);
      this.loading = false;
    });
  }

  buscarPontuacoes(id: number): void {
    this.partidaService.buscarPontuacoes(this.idCampeonato, id)
      .then(response => {
        this.pontuacoes = response;
        this.quantidadePontuacoes = this.pontuacoes.length;
        this.loading = false;
      }).catch(error => {
      this.handler.handle(error);
      this.loading = false;
    });
  }

  converter(response: any): Partida {
    const partida = new Partida();
    partida.idPartida = response.idPartida;
    partida.inicio = new Date(response.inicio);
    return partida;
  }

  getPosicaoStyle(pontuacao: any): string {
    const posicao = this.pontuacoes.indexOf(pontuacao) + 1;
    return posicao === 1 ? 'p-button-success' : posicao === 2 ? 'p-button-warning' : posicao === 3 ? 'p-button-danger' : 'p-button-primary';
  }

  mostrarModalEditar(pontuacao: any): void {
    this.pontuacao = this.converterPontuacao(pontuacao);
    this.modalEditar = true;
  }

  salvarPontuacao(): void {
    this.loading = true;
    this.partidaService.salvarPontuacao(this.idCampeonato, this.partida.idPartida, this.pontuacao)
      .then(response => {
        this.modalEditar = false;
        this.buscarPontuacoes(this.partida.idPartida);
      }).catch(error => {
      this.handler.handle(error);
      this.loading = false;
    });
  }

  converterPontuacao(p: any): Pontuacao {
    const pontuacao = new Pontuacao();
    pontuacao.idPontuacao = p.idPontuacao;
    pontuacao.idJogador = p.idJogador;
    pontuacao.numero = p.numero;
    pontuacao.nome = p.nome;
    pontuacao.gol = p.gol;
    pontuacao.assistencia = p.assistencia;
    pontuacao.pontuacao = p.pontuacao;
    pontuacao.vitoria = p.vitoria;
    return pontuacao;
  }
}
