import { CadastroAluno } from './cadastroAluno';
import { Aluno } from '../models/Aluno';

describe('O cadastro de alunos', () => {
    let cadastro: CadastroAluno;

    beforeEach(() => cadastro = new CadastroAluno());

    it('é inicialmente vazio', () => expect(cadastro.alunos.length).toBe(0));

    it('cadastra alunos corretamente', () => {
        let aluno = new Aluno();
        aluno.nome = 'Mariana';
        aluno.cpf = '683';
        cadastro.cadastrar(aluno);
        expect(cadastro.alunos.length).toBe(1);

        aluno = cadastro.alunos[0];
        expect(aluno.nome).toBe('Mariana');
        expect(aluno.cpf).toBe('683');
        expect(aluno.email).toBe('');
        expect(aluno.metas.size).toBe(0);
        expect(aluno.autoAvaliacao.size).toBe(0);
        expect(aluno.discrepancias.length).toBe(0);
    });

    it('não aceita alunos com CPF duplicado', () => {
        let aluno = new Aluno();
        aluno.nome = 'Mariana';
        aluno.cpf = '683';
        cadastro.cadastrar(aluno);

        aluno = new Aluno();
        aluno.nome = 'Pedro';
        aluno.cpf = '683';
        cadastro.cadastrar(aluno);

        expect(cadastro.alunos.length).toBe(1);
    });
});
