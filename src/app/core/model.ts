export class Aluno {
  idAluno: number;
  nome: string;
  email: string;
  usuario: string;
  senha: string;
  matricula: string;
  status = true;

}

export class Professor {
  idProfessor: number;
  nome: string;
  email: string;
  usuario: string;
  senha: string;
  status = true;
}

export class Coordenador {
  idCoordenador: number;
  nome: string;
  email: string;
  usuario: string;
  senha: string;
  status = true;

}

export class Turma {
  idTurma: number;
  materia: string;
  ano: number;
  periodo: string;
  tipo: string;
  finalizada: boolean;
  professor: Professor;
  alunos: Aluno[] = [];
}

export class Aula {
  id: number;
  title: string;
  date: string;
  start: string;
  end: string;

  constructor() {
  }

}

export class Campeonato {
  idCampeonato: number;
  nome: string;
  inicio: Date;
  termino: Date;
  finalizado = false;
  codigoCompartilhamento: string;

  constructor() {
  }
}

export class Jogador {
  idJogador: number;
  nome: string;
  numero: number;

  constructor() {
  }
}

export class Partida {
  idPartida: number;
  inicio: Date;

  constructor() {
  }
}

export class Pontuacao {
  idPontuacao: number;
  idJogador: number;
  numero: number;
  nome: string;
  gol: number;
  assistencia: number;
  pontuacao: number;
  status: string;

  constructor() {
  }
}

export class Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  senha: string;

  constructor() {
  }
}

export class Configuracao {
  idCampeonato = 0;
  gol = 0;
  assistencia = 0;
  vitoria = 0;

  constructor() {
  }
}
