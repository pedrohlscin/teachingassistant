import { Component, OnInit } from '@angular/core';
import { Aluno } from '../alunos/shared/aluno.model';
import { AlunoService } from '../alunos/shared/aluno.service';

@Component({
  selector: 'app-discrepancias',
  templateUrl: './discrepancias.component.html',
  styleUrls: ['./discrepancias.component.css'],
})
export class DiscrepanciasComponent implements OnInit {
  public alunos: Aluno[];

  public constructor(private alunoService: AlunoService) {
  }

  public ngOnInit(): void {
    this.alunoService.getAlunos()
      .then(value => this.alunos = value)
      .catch(reason => alert(reason.json().failure || reason));
  }
}
