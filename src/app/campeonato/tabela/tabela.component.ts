import {Component, OnInit} from '@angular/core';
import {PartidaService} from '../../partida/partida.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ConfirmationService} from 'primeng/api';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {CampeonatoService} from '../campeonato.service';
import {Campeonato} from '../../core/model';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  pontuacoes = [];

  campeonato = new Campeonato();
  quantidadePontuacoes: number;

  constructor(private partidaService: PartidaService,
              private campeonatoService: CampeonatoService,
              private rout: ActivatedRoute,
              private router: Router,
              private title: Title,
              private confirmation: ConfirmationService,
              private handler: ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.title.setTitle('Tabela do campeonato');
    const idCampeonato = this.rout.snapshot.params.idCampeonato;
    const codigoCompartilhado = this.rout.snapshot.params.codigoCompartilhado;
    if (idCampeonato) {
      this.buscarCampeonato(idCampeonato);
    } else if (codigoCompartilhado) {
      this.buscarTabelaCompartilhada(codigoCompartilhado);
    }
  }

  buscarPontuacoes(id: number): void {
    this.campeonatoService.buscarTabela(id)
      .then(response => {
        this.pontuacoes = response;
        this.quantidadePontuacoes = this.pontuacoes.length;
      }).catch(error => {
      this.handler.handle(error);
    });
  }

  buscarCampeonato(idCampeonato: any): void {
    this.campeonatoService.buscar(idCampeonato)
      .then(response => {
        this.converter(response);
        this.buscarPontuacoes(idCampeonato);
      }).catch(error => {
      this.handler.handle(error);
    });
  }

  buscarTabelaCompartilhada(codigoCompartilhamento: any): void {
    this.campeonatoService.buscarTabelaCompartilhada(codigoCompartilhamento)
      .then(response => {
        this.pontuacoes = response;
        this.quantidadePontuacoes = this.pontuacoes.length;
        this.campeonato = new Campeonato();
      }).catch(error => {
        this.handler.handle(error);
    });
  }

  converter(response: any): void {
    this.campeonato = new Campeonato();
    this.campeonato.idCampeonato = response.idCampeonato;
    this.campeonato.nome = response.nome;
    this.campeonato.inicio = new Date(response.inicio + 'Z');
    this.campeonato.termino = new Date(response.termino + 'Z');
    this.campeonato.finalizado = Boolean(response.finalizado);
  }

  getPosicaoStyle(pontuacao: any): string {
    const posicao = this.pontuacoes.indexOf(pontuacao) + 1;
    return posicao === 1 ? 'p-button-success' : posicao === 2 ? 'p-button-warning' : posicao === 3 ? 'p-button-danger' : 'p-button-primary';
  }
}
