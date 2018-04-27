import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Aluno } from './aluno.model';

@Injectable()
export class AlunoService {
  private baseURL = 'http://localhost:3000';
  private options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  public constructor(private http: Http) {
  }

  public cadastrar(aluno: Aluno): Promise<Aluno> {
    return this.http.post(this.baseURL + '/aluno', JSON.stringify(aluno), this.options)
      .toPromise()
      .then(value => value.json().success ? aluno : null)
      .catch(reason => Promise.reject(reason));
  }

  public atualizar(aluno: Aluno): Promise<Aluno> {
    for (const key in aluno.autoAvaliacao) {
      if (!['MA', 'MPA', 'MANA'].find(value => value === aluno.autoAvaliacao[key])) {
        aluno.autoAvaliacao[key] = '';
      }
    }

    return this.http.put(this.baseURL + '/aluno', JSON.stringify(aluno), this.options)
      .toPromise()
      .then(value => value.json().success ? aluno : null)
      .catch(reason => Promise.reject(reason));
  }

  public getAlunos(): Promise<Aluno[]> {
    return this.http.get(this.baseURL + '/alunos')
      .toPromise()
      .then(value => value.json() as Aluno[])
      .catch(reason => Promise.reject(reason));
  }
}
