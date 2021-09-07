import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaProfessorComponent} from './lista-professor/lista-professor.component';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {SharedModule} from '../shared/shared.module';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {FormsModule} from '@angular/forms';
import {CadastroProfessorComponent} from './cadastro-professor/cadastro-professor.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import {PasswordModule} from 'primeng/password';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ListaProfessorComponent, CadastroProfessorComponent],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    SharedModule,
    InputTextModule,
    TooltipModule,
    FormsModule,
    SelectButtonModule,
    PasswordModule,
    RouterModule,
  ],
    exports: [],
  providers: []
})
export class ProfessorModule { }
