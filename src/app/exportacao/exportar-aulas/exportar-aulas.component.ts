import {Component, OnInit} from '@angular/core';
import {TurmaService} from "../../turma/turma.service";
import {ErrorHandlerService} from "../../core/error-handler.service";
import * as fileSaver from 'file-saver';

export class ExportacaoFiltro {
  idTurma: string;
  formato: string;
}

@Component({
  selector: 'app-exportar-aulas',
  templateUrl: './exportar-aulas.component.html',
  styleUrls: ['./exportar-aulas.component.css']
})
export class ExportarAulasComponent implements OnInit {

  filtro = new ExportacaoFiltro();

  turmas = [{label: 'Selecione', value: null}];
  formatos = [
    {label: 'Selecione', value: null},
    {label: 'PDF', value: 'pdf'},
    {label: 'JSON', value: 'json'},
  ];

  constructor(private turmaService: TurmaService,
              private handler: ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.carregarTurmas();
  }

  carregarTurmas(): void {
    this.turmaService.listar()
      .then(turmas => {
        console.log('turmas: ', turmas);
        for (const t of turmas) {
          console.log('turma: ', t);
          const nome = `${t.materia} - ${t.ano}/${t.periodo}`;
          this.turmas.push({label: nome, value: t.idTurma});
        }
      })
      .catch(error => {
        console.log(error);
        this.handler.handle(error);
      });
  }

  exportar(): void {
    this.turmaService.exportar(this.filtro)
      .then(response => {
        this.download(response, this.filtro.formato);
        this.handler.addSuccess('Sucesso', 'Gerado com sucesso');
      })
      .catch(error => this.handler.handle(error));
  }

  download(response, formato): void {
    let type;
    if (formato === 'json') {
      type = 'text/json; charset=utf-8';
    } else if (formato === 'pdf') {
      type = 'pdf/json; charset=utf-8';
    }

    const blob = new Blob([response], {type});
    fileSaver.saveAs(blob, `presencas.${formato}`);
  }
}
