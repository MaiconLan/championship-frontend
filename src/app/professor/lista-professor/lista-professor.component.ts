import {Component} from '@angular/core';
import {ProfessorFiltro, ProfessorService} from '../professor.service';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-lista-professor',
  templateUrl: './lista-professor.component.html',
  styleUrls: ['./lista-professor.component.css']
})
export class ListaProfessorComponent {

  loading = false;
  totalRegistros = 0;

  filtro = new ProfessorFiltro();

  professores = [];

  constructor(private professorService: ProfessorService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private handler: ErrorHandlerService,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Busca de professores');
  }

  consultar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.loading = true;
    this.professorService.consultar(this.filtro)
      .then(response => {
        if (!response) {
          this.cleanList();
        } else {
          this.totalRegistros = response.totalElements;
          this.professores = response.content;
        }
      }).catch(error => {
      this.handler.handle(error);
      this.cleanList();
    });

    this.loading = false;
  }

  private cleanList(): void {
    this.totalRegistros = 0;
    this.professores = [];
  }

  confirmarExclusao(professor: any): void {
    this.confirmation.confirm({
      icon: 'pi pi-info-circle',
      header: 'Confirmar exclusão!',
      message: 'Você tem certeza de que deseja excluir?',
      accept: () => {
        this.excluir(professor);
      },
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-info p-button-rounded',
      rejectButtonStyleClass: 'botao-excluir p-button-danger p-button-rounded'
    });
  }

  excluir(professor: any): void {
    this.loading = true;
    this.professorService.excluir(professor.idProfessor).then(() => {
      this.consultar(this.filtro.pagina);
      this.addSuccess('Sucesso', 'Registro excluído com sucesso');
    }).catch(error => {
      this.handler.handle(error);
    });
    this.loading = false;
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.consultar(pagina);
  }

  addSuccess(title: string, message: string): void {
    this.messageService.add({severity: 'success', summary: title, detail: message, life: 3000});
  }

}
