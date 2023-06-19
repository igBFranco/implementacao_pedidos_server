import { Request, Response, NextFunction } from "express";
import mysql from "mysql2";
import * as dotenv from 'dotenv'

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
    host: process.env.HOST, // nome do container Docker do MySQL
    user: dotenv.config().parsed?.USER,
    password: dotenv.config().parsed?.PASSWORD,
    database: dotenv.config().parsed?.DATABASE,
    port: 30306, // porta do MySQL no container
});


export const getClients = (req: Request, res: Response, next: NextFunction) => {
  const query = 'SELECT * FROM CLIENTE';
  connection.query(query, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
}

export const getClientById = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const query = 'SELECT * FROM CLIENTE WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return next(err);
    }
    if (res.length === 0) {
      return res.status(404).json({ error: 'Registro não encontrado' });
    }
    res.json(results[0]);
  });
}

export const createClient = (req: Request, res: Response, next: NextFunction) => { 
  const { NOME, CPF, EMAIL, ENDERECO, TELEFONE, NUMERO, BAIRRO, CIDADE, UF, CEP } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!NOME || !CPF || !EMAIL || !ENDERECO || !TELEFONE || !NUMERO || !BAIRRO || !CIDADE || !UF || !CEP) {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'INSERT INTO CLIENTE (NOME, CPF, EMAIL, ENDERECO, TELEFONE, NUMERO, BAIRRO, CIDADE, UF, CEP) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [NOME, CPF, EMAIL, ENDERECO, TELEFONE, NUMERO, BAIRRO, CIDADE, UF, CEP];
  connection.query(query, values, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ result, ...req.body });
  });
}

export const updateClient = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const { NOME, CPF, EMAIL, ENDERECO, TELEFONE, NUMERO, BAIRRO, CIDADE, UF, CEP } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!NOME || !CPF || !EMAIL || !ENDERECO || !TELEFONE || !NUMERO || !BAIRRO || !CIDADE || !UF || !CEP) {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'UPDATE CLIENTE SET NOME = ?, CPF = ?, EMAIL = ?, ENDERECO = ?, TELEFONE = ?, NUMERO = ?, BAIRRO = ?, CIDADE = ?, UF = ?, CEP = ? WHERE id = ?';
  const values = [NOME, CPF, EMAIL, ENDERECO, TELEFONE, NUMERO, BAIRRO, CIDADE, UF, CEP, id];
  connection.query(query, values, (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
}

export const deleteClient = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;

  const query = 'DELETE FROM CLIENTE WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
}

