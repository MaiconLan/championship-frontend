import {Component, OnInit} from '@angular/core';
import {Campeonato} from '../../core/model';
import {NgForm} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {CampeonatoService} from '../campeonato.service';
import {JogadorService} from '../../jogador/jogador.service';

@Component({
  selector: 'app-cadastro-campeonato',
  templateUrl: './cadastro-campeonato.component.html',
  styleUrls: ['./cadastro-campeonato.component.css']
})
export class CadastroCampeonatoComponent implements OnInit {

  campeonato = new Campeonato();
  loading = false;

  status = [
    {label: 'Finalizado', value: true, style: 'background-color: blue;'},
    {label: 'Não Finalizado', value: false, style: 'background-color: red;'},
  ];

  pt: any;
  jogadores: [];
  quantidadeJogadores = 0;

  constructor(private campeonatoService: CampeonatoService,
              private jogadorService: JogadorService,
              private messageService: MessageService,
              private rout: ActivatedRoute,
              private router: Router,
              private title: Title,
              private confirmation: ConfirmationService,
              private handler: ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.configure();
    this.title.setTitle('Cadastro de campeonatos');
    const id = this.rout.snapshot.params.idCampeonato;

    if (id) {
      this.buscar(id);
    }
  }

  listarJogadores(): void {
    this.campeonatoService.listarJogadores(this.campeonato.idCampeonato)
      .then(jogadores => {
        this.jogadores = jogadores;
        this.quantidadeJogadores = jogadores.length;
      }).catch(error => {
      this.handler.handle(error);
    });
  }

  salvar(): void {
    if (this.editando()) {
      this.atualizar();
    } else {
      this.criar();
    }
  }

  criar(): void {
    this.campeonatoService.criar(this.campeonato).then(campeonato => {
      console.log(campeonato);
      this.handler.addSuccess('Criado', 'Registro criado com sucesso');
      this.router.navigate(['campeonato', campeonato.idCampeonato]);
    }).catch(error => {
      this.handler.handle(error);
    });
  }

  atualizar(): void {
    this.campeonatoService.atualizar(this.campeonato).then(response => {
      this.handler.addSuccess('Atualizado', 'Registro atualizado com sucesso');
      this.converter(response);
    }).catch(error => {
      this.handler.handle(error);
    });
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

  editando(): boolean {
    return Boolean(this.campeonato.idCampeonato);
  }

  novo(form: NgForm): void {
    form.reset();

    setTimeout(function(): void {
      this.campeonato = new Campeonato();
    }.bind(this), 1);

    this.router.navigate(['campeonato', 'novo']);
  }

  novoJogador(): void {
    setTimeout(function(): void {
      console.log();
    }.bind(this), 1);

    this.router.navigate(['campeonato', this.campeonato.idCampeonato, 'jogador', 'novo']);
  }

  buscar(id: number): void {
    this.campeonatoService.buscar(id)
      .then(response => {
        this.converter(response);
        this.listarJogadores();
      }).catch(error => {
      this.handler.handle(error);
    });
  }

  converter(response: any): void {
    this.campeonato.idCampeonato = response.idCampeonato;
    this.campeonato.nome = response.nome;
    this.campeonato.inicio = new Date(response.inicio);
    this.campeonato.termino = new Date(response.termino);
    this.campeonato.finalizado = Boolean(response.finalizado);
  }

  confirmarExclusaoJogador(jogador: any): void {
    this.confirmation.confirm({
      icon: 'pi pi-info-circle',
      header: 'Confirmar exclusão!',
      message: 'Você tem certeza de que deseja excluir? Toda pontuação será removida!',
      accept: () => {
        this.jogadorService.excluirJogador(this.campeonato.idCampeonato, jogador.idJogador)
          .then(() => {
            this.handler.addSuccess('Sucesso', 'Jogador excluído com sucesso');
            this.listarJogadores();
          }).catch(error => this.handler.handle(error));
      },
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-info p-button-rounded',
      rejectButtonStyleClass: 'botao-excluir p-button-danger p-button-rounded'
    });
  }
}
