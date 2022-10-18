import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CampeonatoFiltro, CampeonatoService} from '../campeonato.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {environment} from "../../../environments/environment";
import {CdkCopyToClipboard, Clipboard} from "@angular/cdk/clipboard";
import {Configuracao} from "../../core/model";

@Component({
  selector: 'app-lista-campeonato',
  templateUrl: './lista-campeonato.component.html',
  styleUrls: ['./lista-campeonato.component.css']
})
export class ListaCampeonatoComponent implements OnInit {

  urlCompartilhamento = '';
  loading = false;
  totalRegistros = 0;

  filtro = new CampeonatoFiltro();
  configuracao = new Configuracao();
  modalConfiguracao = false;

  campeonatos = [];

  constructor(private title: Title,
              private confirmation: ConfirmationService,
              private handler: ErrorHandlerService,
              private campeonatoService: CampeonatoService,
              private clipboard: Clipboard) {
  }

  ngOnInit(): void {
    this.title.setTitle('Busca de campeonatos');
    this.consultar();
  }

  consultar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.loading = true;
    this.campeonatoService.consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.length;
        this.campeonatos = response;
        this.loading = false;
      }).catch(error => {
      this.handler.handle(error);
      this.cleanList();
      this.loading = false;
    });

  }

  private cleanList(): void {
    this.totalRegistros = 0;
    this.campeonatos = [];
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.consultar(pagina);
  }

  confirmarExclusao(campeonato: any): void {
    this.confirmation.confirm({
      icon: 'pi pi-info-circle',
      header: 'Confirmar exclusão!',
      message: 'Você tem certeza de que deseja excluir? Todos os dados serão perdidos.',
      accept: () => {
        this.excluir(campeonato);
      },
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-info p-button-rounded',
      rejectButtonStyleClass: 'botao-excluir p-button-danger p-button-rounded'
    });
  }

  excluir(campeonato: any): void {
    this.loading = true;
    this.campeonatoService.excluir(campeonato.idCampeonato).then(() => {
      this.consultar(this.filtro.pagina);
      this.handler.addSuccess('Sucesso', 'Registro excluído com sucesso');
      this.loading = false;
    }).catch(error => {
      this.handler.handle(error);
      this.loading = false;
    });
  }

  compartilhar(campeonato: any): void {
    this.loading = true;

    if (!campeonato.codigoCompartilhamento) {
      this.campeonatoService.compartilhar(campeonato.idCampeonato).then(response => {
        this.criarUrlCompartilhamento(response.codigoCompartilhamento);
      }).catch(error => {
        this.handler.handle(error);
        this.loading = false;
      });
    } else {
      this.criarUrlCompartilhamento(campeonato.codigoCompartilhamento);
    }
  }

  private criarUrlCompartilhamento(codigoCompartilhamento): void {
    this.urlCompartilhamento = `${environment.frontendUrl}/campeonato/tabela/${codigoCompartilhamento}`;
    this.clipboard.copy(this.urlCompartilhamento);
    this.handler.addSuccess('Copiado!', 'Copiado com sucesso para a área de transferência!');
    this.loading = false;
  }

  mostrarModalConfiguracao(campeonato: any): void {
    this.loading = true;

    this.campeonatoService.buscarConfiguracao(campeonato.idCampeonato)
      .then(response => {
        this.configuracao = response;
        this.modalConfiguracao = true;
        this.loading = false;
      }).catch(error => {
        this.modalConfiguracao = false;
        this.handler.handle(error);
        this.loading = false;
    });
  }

  editarConfiguracao(): void {
    this.loading = true;
    this.campeonatoService.editarConfiguracao(this.configuracao)
      .then(() => {
        this.loading = false;
        this.handler.addSuccess('Salvo com sucesso', 'A pontuação foi salva com sucesso!');
      }).catch(error => {
        this.handler.handle(error);
        this.loading = false;
    });
  }

  recalcularPontuacao(): void {
    this.loading = true;
    this.campeonatoService.recalcularPontuacao(this.configuracao.idCampeonato)
      .then(() => {
        this.configuracao = new Configuracao();
        this.modalConfiguracao = false;
        this.loading = false;
        this.handler.addSuccess('Recalculado com sucesso', 'A pontuação foi recalculada com sucesso!');
      }).catch(error => {
      this.handler.handle(error);
      this.loading = false;
    });
  }
}
