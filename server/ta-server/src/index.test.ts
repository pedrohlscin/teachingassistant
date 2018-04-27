import * as http from 'http';
import * as request from 'request-promise';
import { port, server } from './';
import { Aluno } from './models/Aluno';

const base_url = `http://localhost:${port}`;

describe('O servidor', () => {
    let serverInstance: http.Server;

    beforeAll(() => serverInstance = server);

    afterAll(() => serverInstance.close());

    it('inicialmente retorna uma lista de alunos vazia', () => {
        const options = {
            method: 'GET',
            uri: base_url + '/alunos',
            json: true,
        };
        return request.get(options)
            .then((body) => expect(body).toEqual([]))
            .catch((error) => expect(error).toBeNull());
    });

    it('só cadastra alunos', () => {
        const options = {
            method: 'POST',
            uri: base_url + '/aluno',
            body: new Aluno(),
            json: true,
        };
        options.body.nome = 'Mari';
        options.body.cpf = '962';
        return request(options)
            .then((body) => expect(body).toEqual({
                failure: 'O aluno não pode ser cadastrado',
            }))
            .catch((error) => expect(error).not.toBeNull());
    });

    it('não cadastra alunos com CPF duplicado', () => {
        const options = {
            method: 'POST',
            uri: base_url + '/aluno',
            body: new Aluno(),
            json: true,
        };
        options.body.nome = 'Mari';
        options.body.cpf = '965';
        return request.post(options)
            .then((body) => {
                expect(body).toEqual({
                    success: 'O aluno foi cadastrado com sucesso',
                });

                const options = {
                    method: 'POST',
                    uri: base_url + '/aluno',
                    body: new Aluno(),
                    json: true,
                };
                options.body.nome = 'Pedro';
                options.body.cpf = '965';
                return request.post(options)
                    .then((body) => {
                        expect(body).toEqual({
                            failure: 'O aluno não pode ser cadastrado',
                        });

                        const options = {
                            method: 'GET',
                            uri: base_url + '/alunos',
                            json: true,
                        };
                        return request.get(options)
                            .then((body) => {
                                expect(body).toContain('{"nome":"Mari","cpf":"965","email":"","metas":{}}');
                                expect(body).not.toContain('{"nome":"Pedro","cpf":"965","email":"","metas":{}}');
                            })
                            .catch((error) => expect(error).toBeNull());
                    })
                    .catch((error) => expect(error).not.toBeNull());
            })
            .catch((error) => expect(error).toBeNull());
    });
});
