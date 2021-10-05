import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {DashboardService} from './dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */

  cardsPc = [
    {
      id: 1,
      title: 'Campeonatos em andamento',
      cols: 2,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#CB4335', 'color': '#fff'},
      numero: '0',
      link: '/aluno'
    },
    {
      id: 2,
      title: 'Campeonatos finalizados',
      cols: 1,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#229954', 'color': 'white'},
      numero: '0',
      link: '/professor'
    },
    {
      id: 3,
      title: 'Partidas da semana',
      cols: 2,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#7D3C98', 'color': '#fff'},
      numero: '0'
    },
    {
      id: 4,
      title: 'Jogadores cadastrados',
      cols: 1,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#2E4053', 'color': '#fff'},
      numero: '0'
    }
  ];

  cardsMobile = [
    {
      id: 1,
      title: 'Campeonatos em andamento',
      cols: 1,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#CB4335', 'color': 'white'},
      numero: '0',
      link: '/aluno'
    },
    {
      id: 2,
      title: 'Campeonatos finalizados',
      cols: 1,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#229954', 'color': 'white'},
      numero: '0',
      link: '/professor'
    },
    {
      id: 3,
      title: 'Partidas da semana',
      cols: 1,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#7D3C98', 'color': '#fff'},
      numero: '0'
    },
    {
      id: 4,
      title: 'Jogadores cadastrados',
      cols: 1,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#2E4053', 'color': '#fff'},
      numero: '0'
    }
  ];

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      // mobile
      if (matches) {
        return this.cardsMobile;
      }

      return this.cardsPc;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private dashboardService: DashboardService) {
  }

  abrirModalDashboard(card: any): void {
    card.mostrarModal = true;
  }

  fecharModalDashboard(card: any): void {
    card.mostrarModal = false;
  }

  ngOnInit(): void {
    this.dashboardService.getDadosDashboard()
      .then(response => {
        for (const card of this.cardsPc) {
          if (card.id === 1) {
            card.numero = response.campeonatosEmAndamento;
          } else if (card.id === 2) {
            card.numero = response.campeonatosFinalizados;
          } else if (card.id === 3) {
            card.numero = response.jogadores;
          } else if (card.id === 4) {
            card.numero = response.partidasNaSemana;
          }
        }

        for (const card of this.cardsMobile) {
          if (card.id === 1) {
            card.numero = response.campeonatosEmAndamento;
          } else if (card.id === 2) {
            card.numero = response.campeonatosFinalizados;
          } else if (card.id === 3) {
            card.numero = response.jogadores;
          } else if (card.id === 4) {
            card.numero = response.partidasNaSemana;
          }
        }
      });
  }
}
