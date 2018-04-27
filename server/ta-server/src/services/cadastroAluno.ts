import { Aluno } from '../models/Aluno';

export class CadastroAluno {
    private _alunos: Aluno[];

    public constructor() {
        this._alunos = [];
    }

    get alunos(): Aluno[] {
        return this._alunos;
    }

    private static toNumber(value: string): number {
        switch (value) {
            case "MA":
                return 10;
            case "MPA":
                return 7;
            case "MANA":
                return 5;
            default:
                return -1;
        }
    }

    private static toString(value: string): string {
        switch (value) {
            case "requisitos":
                return "Requisitos";
            case "gerDeConfiguracao":
                return "Gerência de Configuração";
            default:
                return value;
        }
    }

    public cadastrar(aluno: Aluno): boolean {
        if (!this.findByCpf(aluno.cpf)) {
            const e = new Aluno();
            e.copyFrom(aluno);
            this._alunos.push(e);
            return true;
        }

        return false;
    }

    public atualizar(aluno: Aluno): boolean {
        const e = this.findByCpf(aluno.cpf);
        if (e) {
            e.copyFrom(aluno);

            e.discrepancias = [];
            for (const key in aluno.autoAvaliacao) {
                if (e.metas[key] && e.autoAvaliacao[key]) {
                    if (CadastroAluno.toNumber(e.autoAvaliacao[key]) > CadastroAluno.toNumber(e.metas[key])) {
                        e.discrepancias.push(CadastroAluno.toString(key));
                    }
                }
            }

            return true;
        }

        return false;
    }

    private findByCpf(cpf: string): Aluno | undefined {
        return this._alunos.find(value => value.cpf === cpf);
    }
}
