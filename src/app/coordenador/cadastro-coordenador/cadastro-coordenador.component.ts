import {Component, OnInit} from '@angular/core';
import {Coordenador} from "../../core/model";
import {NgForm} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {CoordenadorService} from "../coordenador.service";

@Component({
  selector: 'app-cadastro-coordenador',
  templateUrl: './cadastro-coordenador.component.html',
  styleUrls: ['./cadastro-coordenador.component.css']
})
export class CadastroCoordenadorComponent implements OnInit {

  coordenador = new Coordenador();

  status = [
    {label: 'Ativo', value: true},
    {label: 'Inativo', value: false},
  ];

  constructor(private coordenadorService: CoordenadorService,
              private messageService: MessageService,
              private rout: ActivatedRoute,
              private router: Router,
              private title: Title,
              private confirmation: ConfirmationService,
              private handler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de coordenadores');
    const id = this.rout.snapshot.params.id;

    if (id) {
      this.buscar(id);
    }
  }

  salvar(): void {
    if (this.editando()) {
      this.atualizar();
    } else {
      this.criar();
    }
  }

  criar(): void {
    this.coordenadorService.criar(this.coordenador).then(coordenador => {
      this.handler.addSuccess('Criado', 'Registro criado com sucesso');
      this.router.navigate(['/coordenador', coordenador.idCoordenador]);
    }).catch(error => {
      this.handler.handle(error);
    });
  }

  atualizar(): void {
    this.coordenadorService.atualizar(this.coordenador).then(response => {
      this.handler.addSuccess('Atualizado', 'Registro atualizado com sucesso');
      this.coordenador = response;
    }).catch(error => {
      this.handler.handle(error);
    });
  }

  buscar(id: number): void {
    this.coordenadorService.buscar(id)
      .then(response => {
        this.coordenador = response;
        this.title.setTitle('Edição de coordenadores');
      }).catch(error => {
      this.handler.handle(error);
    });
  }

  editando(): boolean {
    return Boolean(this.coordenador.idCoordenador);
  }

  novo(form: NgForm): void {
    form.reset();

    setTimeout(function(): void {
      this.coordenador = new Coordenador();
    }.bind(this), 1);

    this.router.navigate(['/coordenador/novo']);
  }
}
