import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListaAlunoComponent} from '../aluno/lista-aluno/lista-aluno.component';
import {CadastroAlunoComponent} from '../aluno/cadastro-aluno/cadastro-aluno.component';
import {ListaProfessorComponent} from '../professor/lista-professor/lista-professor.component';
import {CadastroProfessorComponent} from '../professor/cadastro-professor/cadastro-professor.component';
import {PaginaNaoEncontradaComponent} from '../core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import {LoginFormComponent} from '../seguranca/login-form/login-form.component';
import {AuthGuard} from '../seguranca/auth.guard';
import {CadastroTurmaComponent} from '../turma/cadastro-turma/cadastro-turma.component';
import {ListaTurmaComponent} from '../turma/lista-turma/lista-turma.component';
import {CalendarioComponent} from '../turma/calendario/calendario.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {AulaComponent} from "../turma/aula/aula.component";
import {ExportacaoComponent} from "../exportacao/exportacao/exportacao.component";
import {ExportarAulasComponent} from "../exportacao/exportar-aulas/exportar-aulas.component";
import {CadastroCoordenadorComponent} from "../coordenador/cadastro-coordenador/cadastro-coordenador.component";
import {ListaCoordenadorComponent} from "../coordenador/lista-coordenador/lista-coordenador.component";
import {ListaCampeonatoComponent} from '../campeonato/lista-campeonato/lista-campeonato.component';
import {CadastroCampeonatoComponent} from '../campeonato/cadastro-campeonato/cadastro-campeonato.component';
import {CadastroJogadorComponent} from '../jogador/cadastro-jogador/cadastro-jogador.component';
import {ListaPartidaComponent} from '../partida/lista-partida/lista-partida.component';
import {CadastroPartidaComponent} from '../partida/cadastro-partida/cadastro-partida.component';
import {TabelaComponent} from '../campeonato/tabela/tabela.component';
import {CadastroUsuarioComponent} from '../seguranca/cadastro-usuario/cadastro-usuario.component';
import {RecuperarSenhaComponent} from "../seguranca/recuperar-senha/recuperar-senha.component";
import {RedefinirSenhaComponent} from "../seguranca/redefinir-senha/redefinir-senha.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginFormComponent},
  {path: 'usuario/cadastro', component: CadastroUsuarioComponent},
  {path: 'usuario/recuperar', component: RecuperarSenhaComponent},
  {path: 'usuario/redefinir/:codigoRecuperacao', component: RedefinirSenhaComponent},
  {path: 'usuario/senha', component: RecuperarSenhaComponent},
  {path: 'usuario/cadastro/:idUsuario', component: CadastroUsuarioComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'campeonato', component: ListaCampeonatoComponent, canActivate: [AuthGuard]},
  {path: 'campeonato/novo', component: CadastroCampeonatoComponent, canActivate: [AuthGuard]},
  {path: 'campeonato/:idCampeonato', component: CadastroCampeonatoComponent, canActivate: [AuthGuard]},
  {path: 'campeonato/:idCampeonato/jogador/novo', component: CadastroJogadorComponent, canActivate: [AuthGuard]},
  {path: 'campeonato/:idCampeonato/jogador/:idJogador', component: CadastroJogadorComponent, canActivate: [AuthGuard]},
  {path: 'campeonato/:idCampeonato/partida', component: ListaPartidaComponent, canActivate: [AuthGuard]},
  {path: 'campeonato/:idCampeonato/partida/novo', component: CadastroPartidaComponent, canActivate: [AuthGuard]},
  {path: 'campeonato/:idCampeonato/partida/:idPartida', component: CadastroPartidaComponent, canActivate: [AuthGuard]},
  {path: 'campeonato/:idCampeonato/tabela', component: TabelaComponent, canActivate: [AuthGuard]},

  {path: 'usuario/novo', component: ListaAlunoComponent, canActivate: [AuthGuard]},
  {path: 'aluno/novo', component: CadastroAlunoComponent, canActivate: [AuthGuard]},
  {path: 'aluno/:id', component: CadastroAlunoComponent, canActivate: [AuthGuard]},
  {path: 'professor', component: ListaProfessorComponent, canActivate: [AuthGuard]},
  {path: 'professor/novo', component: CadastroProfessorComponent, canActivate: [AuthGuard]},
  {path: 'professor/:id', component: CadastroProfessorComponent, canActivate: [AuthGuard]},
  {path: 'coordenador', component: ListaCoordenadorComponent, canActivate: [AuthGuard]},
  {path: 'coordenador/novo', component: CadastroCoordenadorComponent, canActivate: [AuthGuard]},
  {path: 'coordenador/:id', component: CadastroCoordenadorComponent, canActivate: [AuthGuard]},
  {path: 'turma', component: ListaTurmaComponent, canActivate: [AuthGuard]},
  {path: 'turma/:id/calendario', component: CalendarioComponent, canActivate: [AuthGuard]},
  {path: 'turma/novo', component: CadastroTurmaComponent, canActivate: [AuthGuard]},
  {path: 'turma/:id', component: CadastroTurmaComponent, canActivate: [AuthGuard]},
  {path: 'turma/:idTurma/aula/:idAula', component: AulaComponent, canActivate: [AuthGuard]},
  {path: 'exportacao', component: ExportacaoComponent, canActivate: [AuthGuard]},
  {path: 'exportacao/aula', component: ExportarAulasComponent, canActivate: [AuthGuard]},
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
