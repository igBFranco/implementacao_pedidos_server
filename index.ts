import express, { Application, Request, Response, NextFunction } from 'express';
import mysql from 'mysql2';
const PORT = process.env.PORT || 3001;
import * as dotenv from 'dotenv'
const app: Application = express();
import router from './src/Routes';
import cors from 'cors';

// Middleware para parsear o corpo das requisições em JSON
app.use(express.json());

app.use(cors());

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: process.env.HOST, // nome do container Docker do MySQL
  user: dotenv.config().parsed?.USER,
  password: dotenv.config().parsed?.PASSWORD,
  database: dotenv.config().parsed?.DATABASE,
  //port:3306,
  port: 30306, // porta do MySQL no container
});

// Conectar ao banco de dados MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Rota de exemplo
app.get('/', (req: Request, res: Response) => {
  res.send('API Express + Node.js + TypeScript + MySQL');
});

app.use(router);


// Middleware para tratar erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro na API:', err);
  res.status(500).json({ error: 'Erro interno na API' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
