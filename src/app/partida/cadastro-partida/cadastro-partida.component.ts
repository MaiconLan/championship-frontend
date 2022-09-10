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
    {label: 'Vitória', value: 'VITORIA'},
    {label: 'Derrota', value: 'DERROTA'},
    {label: 'Falta', value: 'FALTA'},
  ];

  pt: any;

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
    this.configure();

    if (idPartida) {
      this.loading = true;
      this.buscar(idPartida);
    }
  }

  configure(): void {
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qua', 'Qui', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Sem',
      timezone: 'America/Sao_Paulo',
      locale: 'pt'
    };
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
        this.partida = this.converter(response);
        this.buscarPontuacoes(this.partida.idPartida);
        this.handler.addSuccess('Atualizado', 'Registro atualizado com sucesso');
      }).catch(error => {
      this.handler.handle(error);
      this.loading = false;
    });
  }

  criar(): void {
    this.partidaService.criar(this.idCampeonato, this.partida)
      .then(response => {
        this.partida = this.converter(response);
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
    partida.inicio = new Date(response.inicio + 'Z');
    return partida;
  }

  mostrarModalEditar(pontuacao: any): void {
    this.pontuacao = this.converterPontuacao(pontuacao);
    this.modalEditar = true;
  }

  iconeResultado(status: any): string {
    switch (status) {
      case 'VITORIA': {
        return 'pi pi-check';
      }
      case 'DERROTA': {
        return 'pi pi-times';
      }
      case 'FALTA': {
        return 'pi pi-exclamation-triangle';
      }
    }
  }

  classResultado(status: any): string {
    switch (status) {
      case 'VITORIA': {
        return 'p-button-success p-button-raised p-button-rounded p-button-outlined';
      }
      case 'DERROTA': {
        return 'p-button-danger p-button-raised p-button-rounded p-button-outlined';
      }
      case 'FALTA': {
        return 'p-button-warning p-button-raised p-button-rounded p-button-outlined';
      }
    }
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
    pontuacao.status = p.status;
    return pontuacao;
  }
}
