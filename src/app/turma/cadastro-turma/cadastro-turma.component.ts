import {Component, OnInit} from '@angular/core';
import {TurmaService} from "../turma.service";
import {Aluno, Turma} from "../../core/model";
import {NgForm} from "@angular/forms";
import {ProfessorService} from "../../professor/professor.service";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {AlunoService} from "../../aluno/aluno.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cadastro-turma',
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.css']
})
export class CadastroTurmaComponent implements OnInit {

  turma = new Turma();

  professores = [{label: 'Selecione', value: null}];
  alunos: Aluno[];

  tipos = [
    {label: 'Selecione', value: null},
    {label: 'Bimestral', value: 'BIMESTRAL'},
    {label: 'Trimestral', value: 'TRIMESTRAL'},
    {label: 'Anual', value: 'ANUAL'},
    {label: 'Semestral', value: 'SEMESTRAL'},
  ];

  constructor(private turmaService: TurmaService,
              private professorService: ProfessorService,
              private alunoService: AlunoService,
              private handler: ErrorHandlerService,
              private messageService: MessageService,
              private title: Title,
              private rout: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de turma');
    const id = this.rout.snapshot.params.id;

    this.carregarDropdownProfessores();

    if (id) {
      this.buscar(id);
    }

    this.carregarDropdownAlunos();
  }

  salvar(): void {
    if (this.editando()) {
      this.atualizar();
    } else {
      this.criar();
    }
  }

  criar(): void {
    this.turmaService.criar(this.turma)
      .then(response => {
        this.handler.addSuccess('Criado', 'Registro criado com sucesso');
        this.router.navigate(['turma', response.idTurma]);
      }).catch(error => this.handler.handle(error));
  }

  atualizar(): void {
    console.log(this.turma);
    this.turmaService.atualizar(this.turma)
      .then(() => {
        this.handler.addSuccess('Atualizado', 'Registro atualizado com sucesso');
      }).catch(error => this.handler.handle(error));
  }

  buscar(id: number): void {
    this.turmaService.buscar(id).then(response => {
      this.turma = response;
      this.title.setTitle('Edição de turma');
    }).catch(error => this.handler.handle(error));
  }

  editando(): boolean {
    return Boolean(this.turma && this.turma.idTurma);
  }

  novo(f: NgForm): void {
    this.turma = new Turma();
    this.carregarDropdownAlunos();
    this.carregarDropdownProfessores();
    f.reset();
    this.router.navigate(['turma/novo']);
  }

  private carregarDropdownProfessores(): void {
    this.professorService.listar()
      .then(response => {
        if (response) {
          for (const professor of response.content) {
            this.professores.push({label: professor.nome, value: professor});
          }
        } else {
          this.professores = [];
        }
      }).catch(error => this.handler.handle(error));
  }

  private carregarDropdownAlunos(): void {
    this.alunoService.listar()
      .then(response => {
        if (response) {
          this.alunos = response.content;
          for (const aluno of this.turma.alunos) {
            const index = this.alunos.findIndex(a => a.idAluno === aluno.idAluno);
            this.alunos.splice(index, 1);
          }
        } else {
          this.alunos = [];
        }
      }).catch(error => this.handler.handle(error));
  }

  acessarCalendario(turma: Turma): void {
    this.router.navigate(['turma', turma.idTurma, 'calendario']);
  }
}
