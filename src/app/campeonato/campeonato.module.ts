import {NgModule} from '@angular/core';
import {ListaCampeonatoComponent} from './lista-campeonato/lista-campeonato.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TooltipModule} from 'primeng/tooltip';
import {TabViewModule} from 'primeng/tabview';
import {CadastroCampeonatoComponent} from './cadastro-campeonato/cadastro-campeonato.component';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {PickListModule} from 'primeng/picklist';
import {TabelaComponent} from './tabela/tabela.component';
import {DialogModule} from "primeng/dialog";
import {ClipboardModule} from "@angular/cdk/clipboard";


@NgModule({
  declarations: [ListaCampeonatoComponent, CadastroCampeonatoComponent, TabelaComponent],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    TooltipModule,
    TabViewModule,
    CalendarModule,
    InputTextModule,
    SelectButtonModule,
    PickListModule,
    DialogModule,
    ClipboardModule,
  ],
  providers: [MessageService, ConfirmationService]
})
export class CampeonatoModule { }
