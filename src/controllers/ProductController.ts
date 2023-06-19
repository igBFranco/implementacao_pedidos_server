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


export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  const query = 'SELECT * FROM PRODUTO';
  connection.query(query, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
}

export const getProductById = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const query = 'SELECT * FROM PRODUTO WHERE id = ?';
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

export const createProduct = (req: Request, res: Response, next: NextFunction) => { 
  const { NOME, DESCRICAO, PRECO } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!NOME || !DESCRICAO || !PRECO) {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'INSERT INTO PRODUTO (NOME, DESCRICAO, PRECO) VALUES (?, ?, ?)';
  const values = [NOME, DESCRICAO, PRECO];
  connection.query(query, values, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ result, ...req.body });
  });
}

export const updateProduct = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const { NOME, DESCRICAO, PRECO} = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!NOME || !DESCRICAO || !PRECO )  {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'UPDATE PRODUTO SET NOME = ?, DESCRICAO = ?, PRECO = ? WHERE id = ?';
  const values = [NOME, DESCRICAO, PRECO, id];
  connection.query(query, values, (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
}

export const deleteProduct = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;

  const query = 'DELETE FROM PRODUTO WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
}

