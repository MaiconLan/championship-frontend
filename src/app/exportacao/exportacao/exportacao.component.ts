import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-exportacao',
  templateUrl: './exportacao.component.html',
  styleUrls: ['./exportacao.component.css']
})
export class ExportacaoComponent implements OnInit {

  cardsPc = [
    {
      id: 1,
      title: 'Aulas',
      cols: 2,
      rows: 1,
      content: 'Exportar os dados de aulas de turmas',
      style: {'background-color': '#CB4335', 'color': '#ffffff'},
      link: '/exportacao/aula',
      icon: 'pi pi-calendar'
    },
  ];

  cardsMobile = [
    {
      id: 1,
      title: 'Aulas',
      cols: 1,
      rows: 1,
      content: 'Exportar os dados de aulas de turmas',
      style: {'background-color': '#CB4335', 'color': '#ffffff'},
      link: '/exportacao/aula',
      icon: 'pi pi-calendar'
    },
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

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
  }

}
