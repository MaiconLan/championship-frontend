import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {PasswordModule} from 'primeng/password';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {RouterModule} from '@angular/router';
import {TooltipModule} from 'primeng/tooltip';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import {ConfirmationService, MessageService} from "primeng/api";
import {CadastroCoordenadorComponent} from "./cadastro-coordenador/cadastro-coordenador.component";
import { ListaCoordenadorComponent } from './lista-coordenador/lista-coordenador.component';

@NgModule({
  declarations: [CadastroCoordenadorComponent, ListaCoordenadorComponent],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
    InputTextModule,
    SelectButtonModule,
    PasswordModule,
    SharedModule,
    HttpClientModule,
    ConfirmDialogModule,
    RouterModule,
    TooltipModule,
    TabViewModule,
    FileUploadModule,
    DialogModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class CoordenadorModule {
}
