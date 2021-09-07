import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ProfessorService} from '../professor.service';
import {Professor} from '../../core/model';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})
export class CadastroProfessorComponent implements OnInit {

  professor = new Professor();

  status = [
    {label: 'Ativo', value: true},
    {label: 'Inativo', value: false},
  ];

  constructor(private professorService: ProfessorService,
              private messageService: MessageService,
              private rout: ActivatedRoute,
              private router: Router,
              private handler: ErrorHandlerService,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de professor');
    const id = this.rout.snapshot.params.id;

    if (id) {
      this.buscar(id);
    }
  }

  buscar(id: number): void {
    this.professorService.buscar(id)
      .then(response => {
        this.professor = response;
      }).catch(error => {
      this.handler.handle(error);
    });
  }

  editando(): boolean {
    return Boolean(this.professor.idProfessor);
  }

  salvar(): void {
    if (this.editando()) {
      this.atualizar();
    } else {
      this.criar();
    }
  }

  criar(): void {
    this.professorService.criar(this.professor).then(professor => {
      this.addSuccess('Criado', 'Registro criado com sucesso');
      this.router.navigate(['/professor', professor.idProfessor]);
    }).catch(error => {
      this.handler.handle(error);
    });
  }

  atualizar(): void {
    this.professorService.atualizar(this.professor).then(response => {
      this.addSuccess('Atualizado', 'Registro atualizado com sucesso');
      this.professor = response;
    }).catch(error => {
      this.handler.handle(error);
    });
  }

  addSuccess(title: string, message: string): void {
    this.messageService.add({severity: 'success', summary: title, detail: message, life: 3000});
  }

  novo(form: NgForm): void {
    form.reset();

    setTimeout(function(): void {
      this.professor = new Professor();
    }.bind(this), 1);

    this.router.navigate(['/professor/novo']);
  }
}
