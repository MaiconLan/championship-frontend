import {Component, OnInit} from '@angular/core';
import {AlunoFiltro, AlunoService} from '../aluno.service';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {Title} from '@angular/platform-browser';
import {ErrorHandlerService} from '../../core/error-handler.service';

@Component({
  selector: 'app-lista-aluno',
  templateUrl: './lista-aluno.component.html',
  styleUrls: ['./lista-aluno.component.css']
})
export class ListaAlunoComponent implements OnInit {

  loading = false;
  totalRegistros = 0;

  filtro = new AlunoFiltro();

  alunos = [];

  constructor(private alunoService: AlunoService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private handler: ErrorHandlerService,
              private title: Title) {
  }

  ngOnInit(): void {
        this.title.setTitle('Busca de alunos');
    }

  consultar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.loading = true;
    this.alunoService.consultar(this.filtro)
      .then(response => {
        if (!response) {
          this.cleanList();
        } else {
          this.totalRegistros = response.totalElements;
          this.alunos = response.content;
        }
      }).catch(error => {
      this.handler.handle(error);
      this.cleanList();
    });

    this.loading = false;
  }

  private cleanList(): void {
    this.totalRegistros = 0;
    this.alunos = [];
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.consultar(pagina);
  }

  confirmarExclusao(aluno: any): void {
    this.confirmation.confirm({
      icon: 'pi pi-info-circle',
      header: 'Confirmar exclusão!',
      message: 'Você tem certeza de que deseja excluir?',
      accept: () => {
        this.excluir(aluno);
      },
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-info p-button-rounded',
      rejectButtonStyleClass: 'botao-excluir p-button-danger p-button-rounded'
    });
  }

  excluir(aluno: any): void {
    this.loading = true;
    this.alunoService.excluir(aluno.idAluno).then(() => {
      this.consultar(this.filtro.pagina);
      this.handler.addSuccess('Sucesso', 'Registro excluído com sucesso');
    }).catch(error => {
      this.handler.handle(error);
    });
    this.loading = false;
  }

}
