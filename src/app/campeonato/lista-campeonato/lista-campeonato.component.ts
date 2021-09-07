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

  confirmarExclusao(aluno: any): void {
    console.log('Removido');
  }
}
