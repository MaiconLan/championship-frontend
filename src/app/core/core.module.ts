import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PaginaNaoEncontradaComponent} from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import {Title} from '@angular/platform-browser';
import {ProfessorService} from '../professor/professor.service';
import {AlunoService} from '../aluno/aluno.service';
import {AuthService} from '../seguranca/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {FacialHttp} from '../seguranca/facial-http';
import {ErrorHandlerService} from './error-handler.service';
import {HttpClientModule} from '@angular/common/http';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [PaginaNaoEncontradaComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule
  ],
  providers: [Title, ProfessorService, AlunoService, AuthService, JwtHelperService, FacialHttp, ErrorHandlerService],
  exports: [SidebarComponent]
})
export class CoreModule {
}
