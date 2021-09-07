import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent} from "primeng/api";
import {CoordenadorService} from "../coordenador.service";
import {ErrorHandlerService} from "../../core/error-handler.service";

export class CoordenadorFiltro {
  nome: string;
  email: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Component({
  selector: 'app-lista-coordenador',
  templateUrl: './lista-coordenador.component.html',
  styleUrls: ['./lista-coordenador.component.css']
})
export class ListaCoordenadorComponent implements OnInit {

  filtro = new CoordenadorFiltro();

  coordenadores = [];

  loading = false;

  totalRegistros = 0;

  constructor(private coordenadorService: CoordenadorService,
              private confirmation: ConfirmationService,
              private handler: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  consultar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.loading = true;
    this.coordenadorService.consultar(this.filtro)
      .then(response => {
        if (!response) {
          this.cleanList();
        } else {
          this.totalRegistros = response.totalElements;
          this.coordenadores = response.content;
        }
      }).catch(error => {
      this.handler.handle(error);
      this.cleanList();
    });

    this.loading = false;
  }

  private cleanList(): void {
    this.totalRegistros = 0;
    this.coordenadores = [];
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.consultar(pagina);
  }

  confirmarExclusao(coordenador: any): void {
    this.confirmation.confirm({
      icon: 'pi pi-info-circle',
      header: 'Confirmar exclusão!',
      message: 'Você tem certeza de que deseja excluir?',
      accept: () => {
        this.excluir(coordenador);
      },
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-info p-button-rounded',
      rejectButtonStyleClass: 'botao-excluir p-button-danger p-button-rounded'
    });
  }

  private excluir(coordenador: any): void {
    this.coordenadorService.excluir(coordenador.idCoordenador).then(() => {
      this.handler.addSuccess('Excluído', 'Registro excluído com sucesso.');
      this.consultar(this.filtro.pagina);
    }).catch(error => this.handler.handle(error));
  }
}
