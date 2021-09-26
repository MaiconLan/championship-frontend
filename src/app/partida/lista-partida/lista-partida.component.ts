import {Component, OnInit} from '@angular/core';
import {PartidaService} from '../partida.service';
import {ConfirmationService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ErrorHandlerService} from '../../core/error-handler.service';

export class PartidaFiltro {
  pagina = 0;
  itensPorPagina = 10;
}

@Component({
  selector: 'app-lista-partida',
  templateUrl: './lista-partida.component.html',
  styleUrls: ['./lista-partida.component.css']
})
export class ListaPartidaComponent implements OnInit {

  idCampeonato: number;
  totalRegistros: number;
  loading = false;

  partidas = [];

  filtro = new PartidaFiltro();

  constructor(private partidaService: PartidaService,
              private rout: ActivatedRoute,
              private router: Router,
              private title: Title,
              private confirmation: ConfirmationService,
              private handler: ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de partida');
    this.idCampeonato = this.rout.snapshot.params.idCampeonato;
    this.loading = false;
    this.consultar();
  }

  consultar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.loading = true;
    this.partidaService.consultar(this.idCampeonato, this.filtro)
      .then(partidas => {
        this.totalRegistros = partidas.length;
        this.converter(partidas);
        this.loading = false;
      }).catch(error => {
      this.loading = false;
      this.handler.handle(error);
      this.cleanList();
    });
  }

  converter(response: any): void {
    this.partidas = [];
    for (const partida of response) {
      this.partidas.push({
        idPartida: partida.idPartida,
        inicio: new Date(partida.inicio + 'Z')
      });
    }
  }

  aoMudarPagina(event: any): void {
    this.consultar();
  }

  confirmarExclusao(partida: any): void {
    this.confirmation.confirm({
      icon: 'pi pi-info-circle',
      header: 'Confirmar exclusão!',
      message: 'Você tem certeza de que deseja excluir?',
      accept: () => {
        this.excluir(partida);
      },
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-info p-button-rounded',
      rejectButtonStyleClass: 'botao-excluir p-button-danger p-button-rounded'
    });
  }

  excluir(partida: any): void {
    this.partidaService.excluir(this.idCampeonato, partida.idPartida)
      .then(() => {
        this.consultar();
        this.handler.addSuccess('Sucesso', 'Removido com sucesso');
      }).catch(error => this.handler.handle(error));
  }

  private cleanList(): void {
    this.partidas = [];
  }

  novaPartida(): void {
    this.router.navigate(['campeonato', this.idCampeonato, 'partida', 'novo']);
  }
}
