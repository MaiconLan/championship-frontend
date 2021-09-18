import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CampeonatoFiltro, CampeonatoService} from '../campeonato.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';

@Component({
  selector: 'app-lista-campeonato',
  templateUrl: './lista-campeonato.component.html',
  styleUrls: ['./lista-campeonato.component.css']
})
export class ListaCampeonatoComponent implements OnInit {

  loading = false;
  totalRegistros = 0;

  filtro = new CampeonatoFiltro();

  campeonatos = [];

  constructor(private title: Title,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private handler: ErrorHandlerService,
              private campeonatoService: CampeonatoService) {
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
      }).catch(error => {
      this.handler.handle(error);
      this.cleanList();
    });

    this.loading = false;
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
    }).catch(error => {
      this.handler.handle(error);
    });
    this.loading = false;
  }
}
