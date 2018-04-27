export class Aluno {
    private _nome: string;
    private _cpf: string;
    private _email: string;
    private _metas: Map<string, string>;
    private _autoAvaliacao: Map<string, string>;
    private _discrepancias: string[];

    public constructor() {
        this.clean();
    }

    get nome(): string {
        return this._nome;
    }

    set nome(value: string) {
        this._nome = value;
    }

    get cpf(): string {
        return this._cpf;
    }

    set cpf(value: string) {
        this._cpf = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get metas(): Map<string, string> {
        return this._metas;
    }

    set metas(value: Map<string, string>) {
        this._metas = value;
    }

    get autoAvaliacao(): Map<string, string> {
        return this._autoAvaliacao;
    }

    set autoAvaliacao(value: Map<string, string>) {
        this._autoAvaliacao = value;
    }

    get discrepancias(): string[] {
        return this._discrepancias;
    }

    set discrepancias(value: string[]) {
        this._discrepancias = value;
    }

    public static cloneMap(from: Map<string, string>): Map<string, string> {
        const to: Map<string, string> = new Map<string, string>();
        for (const key in from) {
            to[key] = from[key];
        }
        return to;
    }

    public clone(): Aluno {
        const aluno = new Aluno();
        aluno.metas = new Map<string, string>();
        aluno.copyFrom(this);
        return aluno;
    }

    public copyFrom(from: Aluno): void {
        this.nome = from.nome;
        this.cpf = from.cpf;
        this.email = from.email;
        this.metas = Aluno.cloneMap(from.metas);
        this.autoAvaliacao = Aluno.cloneMap(from.autoAvaliacao);
        this.discrepancias = from.discrepancias.slice();
    }

    private clean(): void {
        this.nome = '';
        this.cpf = '';
        this.email = '';
        this.metas = new Map<string, string>();
        this.autoAvaliacao = new Map<string, string>();
        this.discrepancias = [];
    }

    public toJSON() {
        return {
            nome: this.nome,
            cpf: this.cpf,
            email: this.email,
            metas: this.metas,
            autoAvaliacao: this.autoAvaliacao,
            discrepancias: this.discrepancias,
        };
    }
}
