import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaPartidaComponent} from './lista-partida/lista-partida.component';
import {ButtonModule} from 'primeng/button';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FormsModule} from '@angular/forms';
import { CadastroPartidaComponent } from './cadastro-partida/cadastro-partida.component';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [ListaPartidaComponent, CadastroPartidaComponent],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    RouterModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    InputTextModule
  ], providers: [MessageService, ConfirmationService]
})
export class PartidaModule {
}
