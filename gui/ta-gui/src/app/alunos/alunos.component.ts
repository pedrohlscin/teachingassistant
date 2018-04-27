import { Component, OnInit } from '@angular/core';
import { Aluno } from './shared/aluno.model';
import { AlunoService } from './shared/aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css'],
})
export class AlunosComponent implements OnInit {
  public aluno = new Aluno();
  public alunos: Aluno[];
  public cpfDuplicado = false;

  public constructor(private alunoService: AlunoService) {
  }

  public criarAluno(a: Aluno): void {
    this.alunoService.cadastrar(a)
      .then(value => {
        this.alunos.push(value);
        this.aluno = new Aluno();
      })
      .catch(reason => {
        const res = reason.json();
        if (res.failure) {
          this.cpfDuplicado = true;
          setTimeout(() => this.cpfDuplicado = false, 4000);
        } else {
          alert(reason);
        }
      });
  }

  public ngOnInit(): void {
    this.alunoService.getAlunos()
      .then(value => this.alunos = value)
      .catch(reason => alert(reason.json().failure || reason));
  }
}
