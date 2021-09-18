import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroJogadorComponent } from './cadastro-jogador/cadastro-jogador.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [CadastroJogadorComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    RouterModule,
    ButtonModule,
    RouterModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class JogadorModule { }
