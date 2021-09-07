import {Component, OnInit} from '@angular/core';
import {Aluno} from '../../core/model';
import {NgForm} from '@angular/forms';
import {AlunoService} from '../aluno.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent implements OnInit {

  aluno = new Aluno();

  mostrarUploadFoto = false;

  mostrarFotoModal = false;
  fotoSelecionada: any;

  fotos = [];

  status = [
    {label: 'Ativo', value: true},
    {label: 'Inativo', value: false},
  ];

  constructor(private alunoService: AlunoService,
              private messageService: MessageService,
              private rout: ActivatedRoute,
              private router: Router,
              private title: Title,
              private confirmation: ConfirmationService,
              private handler: ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de alunos');
    const id = this.rout.snapshot.params.id;

    if (id) {
      this.buscar(id);
    }
  }

  editando(): boolean {
    return Boolean(this.aluno.idAluno);
  }

  buscar(id: number): void {
    this.alunoService.buscar(id)
      .then(response => {
        this.aluno = response;
        this.title.setTitle('Edição de alunos');
        this.mostrarUploadFoto = true;
        this.getFotos();
      }).catch(error => {
      this.handler.handle(error);
    });
  }

  salvar(): void {
    if (this.editando()) {
      this.atualizar();
    } else {
      this.criar();
    }
  }

  criar(): void {
    this.alunoService.criar(this.aluno).then(aluno => {
      this.handler.addSuccess('Criado', 'Registro criado com sucesso');
      this.router.navigate(['/aluno', aluno.idAluno]);
    }).catch(error => {
      this.handler.handle(error);
    });
  }

  atualizar(): void {
    this.alunoService.atualizar(this.aluno).then(response => {
      this.handler.addSuccess('Atualizado', 'Registro atualizado com sucesso');
      this.aluno = response;
    }).catch(error => {
      this.handler.handle(error);
    });
  }

  novo(form: NgForm): void {
    form.reset();

    setTimeout(function(): void {
      this.aluno = new Aluno();
    }.bind(this), 1);

    this.router.navigate(['/aluno/novo']);
  }

  enviarFoto(event: any, form: NgForm): void {
    if (event.files.length > 0) {
      for (const file of event.files) {
        this.alunoService.enviarFoto(this.aluno, file)
          .then(() => {
            this.getFotos();
            this.handler.addSuccess('Sucesso', 'Foto enviada');
            form.reset();
          }).catch(error => this.handler.handle(error));
      }
    }
  }

  getFotos(): void {
    this.alunoService.getFotos(this.aluno)
      .then(respose => {
        this.fotos = respose;
      }).catch(error => this.handler.handle(error));
  }

  headersFoto(): HttpHeaders {
    return new HttpHeaders()
      .append('Content-Type', 'multipart/form-data');
  }

  confirmarExclusao(foto: any): void {
    this.confirmation.confirm({
      icon: 'pi pi-info-circle',
      header: 'Confirmar exclusão!',
      message: 'Você tem certeza de que deseja excluir? Esta foto não será mais utilizada no treinamento do reconhecimento!',
      accept: () => {
        this.alunoService.excluirFoto(foto.idFoto).then(() => {
          this.getFotos();
          this.handler.addSuccess('Sucesso', 'Foto excluída com sucesso');
        }).catch(error => this.handler.handle(error));
      },
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-info p-button-rounded',
      rejectButtonStyleClass: 'botao-excluir p-button-danger p-button-rounded'
    });
  }

  abrirFoto(foto: any): void {
    this.fotoSelecionada = foto;
    this.mostrarFotoModal = true;
  }
}

