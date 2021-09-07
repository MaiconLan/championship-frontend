import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {AulaService} from "../aula.service";
import {LazyLoadEvent, MessageService} from "primeng/api";
import {AlunoService} from "../../aluno/aluno.service";
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {

  idTurma: number;
  presencas = [];
  rostosNaoReconhecidos = [];

  aula: any;

  mostrarModalNaoReconhecidos = false;

  alunos = [];
  totalRegistros = 0;

  constraints = {
    video: {
      facingMode: 'environment',
      width: {ideal: 4096},
      height: {ideal: 2160}
    }
  };

  videoWidth = 0;
  videoHeight = 0;

  fotoCapturada: any;

  @ViewChild('video', {static: true}) videoElement: ElementRef;
  @ViewChild('canvas', {static: true}) canvas: ElementRef;
  urlTurma: any;
  loading = false;

  constructor(private aulaService: AulaService,
              private messageService: MessageService,
              private alunoService: AlunoService,
              private router: Router,
              private handler: ErrorHandlerService,
              private renderer: Renderer2,
              private title: Title,
              private rout: ActivatedRoute) {
  }

  ngOnInit(): void {
    const idAula = this.rout.snapshot.params.idAula;
    this.idTurma = this.rout.snapshot.params.idTurma;

    this.urlTurma = `/turma/${this.idTurma}`;

    if (idAula) {
      this.buscar(idAula);
      this.carregarDropdownAlunos();
    }

    this.startCamera();
  }

  buscar(id: number): void {
    this.loading = true;
    this.aulaService.buscar(id).then(response => {
      this.title.setTitle('Aula');
      this.aula = response;
      this.totalRegistros = this.aula.presencas.length;
      console.log(this.totalRegistros);
      this.loading = false;
    }).catch(error => this.handler.handle(error));
  }

  private carregarDropdownAlunos(): void {
    this.alunoService.listar()
      .then(response => {
        if (response) {
          this.alunos.push({label: 'Ninguém', value: null});
          for (const aluno of response.content) {
            this.alunos.push({label: aluno.nome, value: aluno});
          }
        } else {
          this.alunos = [];
        }
      }).catch(error => this.handler.handle(error));
  }

  startCamera(): void {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }

  handleError(error): void {
    console.log('Error: ', error);
  }

  attachVideo(stream): void {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });

  }

  stopVideo(): void {
    this.renderer.listen(this.videoElement.nativeElement, 'stop', () => {});
  }

  async iniciarAula(): Promise<void> {
    this.handler.addSuccess('Sucesso', 'Aula iniciada');
    let i = 1;
    while (i <= 5) {
      this.capture();
      this.handler.addSuccess('Sucesso', `Capturado ${i} vezes`);
      await this.delay(5000);
      i++;
    }
    this.stopVideo();
  }

  capture(): void {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);

    this.canvas.nativeElement.toBlob(f => {
      this.fotoCapturada = f;
      this.aulaService.reconhecer(this.aula, this.fotoCapturada)
        .then(() => {
          this.buscar(this.aula.id);
        }).catch(error => {
        this.handler.handle(error);
      });
    });
  }

  addSuccess(title: string, message: string): void {
    this.messageService.add({severity: 'success', summary: title, detail: message, life: 3000});
  }

  delay(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  buscarNaoReconhecidos(): void {
    this.aulaService.buscarNaoReconhecidos(this.aula).then(response => {
      this.rostosNaoReconhecidos = response;
      this.mostrarModalNaoReconhecidos = true;
    }).catch(error => this.handler.handle(error));
  }

  salvarRostosReconhecidos(): void {
    this.alunoService.salvarRostosReconhecidos(this.aula, this.rostosNaoReconhecidos)
      .then(() => {
        this.addSuccess('Sucesso', 'Imagens cadastradas com sucesso');
        this.buscarNaoReconhecidos();
        this.mostrarModalNaoReconhecidos = false;
      }).catch(error => this.handler.handle(error));
  }

  exportarAula(): void {
    this.aulaService.exportarAula(this.aula)
      .then(response => {
        this.download(response);
        this.handler.addSuccess('Sucesso', 'Gerado com sucesso');
      }).catch(error => this.handler.handle(error));
  }

  download(response): void {
    const blob = new Blob([response], {type: 'pdf/json; charset=utf-8'});
    fileSaver.saveAs(blob, `presencas.pdf`);
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    const idAula = this.rout.snapshot.params.idAula;
    this.buscar(idAula);
  }
}
