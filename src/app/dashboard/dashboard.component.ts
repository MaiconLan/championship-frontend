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
      title: 'Alunos sem Foto',
      cols: 2,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#CB4335', 'color': '#fff'},
      numero: '0',
      link: '/aluno'
    },
    {
      id: 2,
      title: 'Alunos cadastrados',
      cols: 1,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#229954', 'color': 'white'},
      numero: '0',
      link: '/professor'
    },
    {
      id: 3,
      title: 'Profs. cadastrados',
      cols: 2,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#7D3C98', 'color': '#fff'},
      numero: '0'
    },
    {
      id: 4,
      title: 'Aulas do dia',
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
      title: 'Alunos sem Foto',
      cols: 1,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#CB4335', 'color': 'white'},
      numero: '0',
      link: '/aluno'
    },
    {
      id: 2,
      title: 'Alunos cadastrados',
      cols: 1,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#229954', 'color': 'white'},
      numero: '0',
      link: '/professor'
    },
    {
      id: 3,
      title: 'Profs. cadastrados',
      cols: 1,
      rows: 1,
      mostrarModal: false,
      style: {'background-color': '#7D3C98', 'color': '#fff'},
      numero: '0'
    },
    {
      id: 4,
      title: 'Aulas do dia',
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
    for (const card of this.cardsPc) {
      if (card.id === 1) {
        this.dashboardService.getAlunoDashboard()
          .then(response => {
            card.numero = response.alunosSemFotos;
          });
      } else if (card.id === 2) {
        this.dashboardService.getAlunoDashboard()
          .then(response => {
            card.numero = response.alunosCadastrados;
          });
      } else if (card.id === 3) {
        this.dashboardService.getProfessorDashboard()
          .then(response => {
            card.numero = response.professoresCadastrados;
          });
      } else if (card.id === 4) {
        this.dashboardService.getAulasDashboard()
          .then(response => {
            card.numero = response.aulasDoDia;
          });
      }
    }

    for (const card of this.cardsMobile) {
      if (card.id === 1) {
        this.dashboardService.getAlunoDashboard()
          .then(response => {
            card.numero = response.alunosSemFotos;
          });
      } else if (card.id === 2) {
        this.dashboardService.getAlunoDashboard()
          .then(response => {
            card.numero = response.alunosCadastrados;
          });
      } else if (card.id === 3) {
        this.dashboardService.getProfessorDashboard()
          .then(response => {
            card.numero = response.professoresCadastrados;
          });
      } else if (card.id === 4) {
        this.dashboardService.getAulasDashboard()
          .then(response => {
            card.numero = response.aulasDoDia;
          });
      }
    }
  }
}
