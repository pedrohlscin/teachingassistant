import { Component, OnInit } from '@angular/core';
import { Aluno } from '../alunos/shared/aluno.model';
import { AlunoService } from '../alunos/shared/aluno.service';

@Component({
  selector: 'app-autoavaliacao',
  templateUrl: './autoAvaliacao.component.html',
  styleUrls: ['./autoAvaliacao.component.css'],
})
export class AutoAvaliacaoComponent implements OnInit {
  public alunos: Aluno[];

  public constructor(private alunoService: AlunoService) {
  }

  public atualizarAluno(aluno: Aluno): void {
    this.alunoService.atualizar(aluno)
      .catch(reason => alert(reason.json().failure || reason));
  }

  public ngOnInit(): void {
    this.alunoService.getAlunos()
      .then(value => this.alunos = value)
      .catch(reason => alert(reason.json().failure || reason));
  }
}
