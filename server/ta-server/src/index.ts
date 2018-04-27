import * as express from 'express';
import * as bodyParser from 'body-parser';
import { getAlunos, postAluno, putAluno } from './controllers/aluno';

export const app = express();
export const port = process.env.PORT || 3000;

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.json());

app.get('/alunos', getAlunos);
app.post('/aluno', postAluno);
app.put('/aluno', putAluno);

export const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
