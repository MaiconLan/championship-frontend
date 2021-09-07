import {FullCalendar} from 'primeng/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Calendar} from '@fullcalendar/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarioService} from '../calendario.service';
import {Aula, Turma} from "../../core/model";
import {TurmaService} from "../turma.service";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  options: any;

  events = [];

  mostrarAula: boolean;

  aula = new Aula();

  date: Date;

  start: Date;

  end: Date;

  turma: Turma;

  @ViewChild('fc') fc: FullCalendar;

  idTurma: number;
  pt: any;
  urlTurma: any;

  constructor(private calendarioService: CalendarioService,
              private turmaService: TurmaService,
              private handler: ErrorHandlerService,
              private messageService: MessageService,
              private router: Router,
              private rout: ActivatedRoute) {
    const name = Calendar.name;
  }

  ngOnInit(): void {
    this.idTurma = this.rout.snapshot.params.id;
    this.urlTurma = `/turma/${this.idTurma}`;
    this.getTurma();
    this.listarAulas();
    this.configure();
  }

  getTurma(): void {
    this.turmaService.buscar(this.idTurma)
      .then(response => {
        this.turma = response;
      });
  }

  listarAulas(): void {
    this.calendarioService.getAulas(this.idTurma)
      .then(response => {
        const eventos = [];

        for (const r of response) {
          const evento = {
            id: r.id,
            title: r.title,
            start: this.toDate(r.date, r.start),
            end: this.toDate(r.date, r.end),
          };
          eventos.push(evento);
        }

        this.events = eventos;
      });
  }

  toDate(date, time): Date {
    const dateString = date + 'T' + time;
    return new Date(dateString);
  }

  configure(): void {
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qua', 'Qui', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Sem',
      timezone: 'America/Sao_Paulo',
      locale: 'pt'
    };

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      color: 'yellow',   // an option!
      textColor: 'black', // an option!
      timezone: 'UTC',
      locale: 'pt',
      dateClick: (e) => {
        this.criarEvento(e);
      },
      eventClick: (e) => {
        this.editarEvento(e);
      },
    };
  }

  private criarEvento(event): void {
    this.aula = new Aula();
    this.date = event.date;
    this.start = event.date;
    this.end = event.date;
    this.mostrarAula = true;
  }

  private editarEvento(e): void {
    const event = this.fc.calendar.getEventById(e.event.id);
    this.aula = new Aula();
    this.aula.id = event.id;
    this.aula.title = event.title;
    this.date = event.start;
    this.start = event.start;
    this.end = event.end;

    this.mostrarAula = true;
  }

  minDate(): Date {
    return new Date();
  }

  salvarAula(): void {
    if (this.editando()) {
      this.editarAula();
    } else {
      this.criarAula();
    }
  }

  private criarAula(): void {
    const month = this.date.getUTCMonth() + 1;
    const day = this.date.getUTCDate();
    const year = this.date.getUTCFullYear();
    this.aula.date = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);

    this.aula.start = this.start.toLocaleTimeString();
    this.aula.end = this.end.toLocaleTimeString();

    console.log('Aula String: ', JSON.stringify(this.aula));

    this.calendarioService.criarAula(this.idTurma, this.aula)
      .then(() => {
        this.addSuccess('Aula criada', 'Aula criada com sucesso');
        this.aula = new Aula();
        this.mostrarAula = false;
        this.listarAulas();
      })
      .catch(error => this.handler.handle(error));
  }

  private editarAula(): void {
    const month = this.date.getUTCMonth() + 1;
    const day = this.date.getUTCDate();
    const year = this.date.getUTCFullYear();
    this.aula.date = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);

    this.aula.start = this.start.toLocaleTimeString();
    this.aula.end = this.end.toLocaleTimeString();

    console.log('Aula String: ', JSON.stringify(this.aula));
    this.calendarioService.editarAula(this.aula)
      .then(() => {
        this.listarAulas();
        this.mostrarAula = false;
        this.aula = new Aula();
        this.addSuccess('Aula Editada', 'Aula editada com sucesso');
      })
      .catch(error => this.handler.handle(error));
  }

  excluirAula(): void {
    this.calendarioService.excluirAula(this.aula)
      .then(() => {
        this.mostrarAula = false;
        this.aula = new Aula();
        this.listarAulas();
        this.addSuccess('Aula excluída', 'Aula excluída com sucesso');
      })
      .catch(error => this.handler.handle(error));
  }

  editando(): boolean {
    return Boolean(this.aula && this.aula.id);
  }

  addSuccess(title: string, message: string): void {
    this.messageService.add({severity: 'success', summary: title, detail: message, life: 3000});
  }

  acessarPresencas(): void {
    this.router.navigate(['turma', this.turma.idTurma, 'aula', this.aula.id]);
  }
}

