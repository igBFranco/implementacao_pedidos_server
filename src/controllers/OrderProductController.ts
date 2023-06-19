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


export const getOrderProduct = (req: Request, res: Response, next: NextFunction) => {
  const query = 'SELECT * FROM PEDIDO_PRODUTO';
  connection.query(query, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
}

export const getOrderProductById = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const query = 'SELECT * FROM PEDIDO_PRODUTO WHERE id = ?';
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

export const createOrderProduct = (req: Request, res: Response, next: NextFunction) => { 
  const { PEDIDO_ID, PRODUTO_ID, QUANTIDADE, VALOR_UNITARIO } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!PEDIDO_ID || !PRODUTO_ID || !QUANTIDADE || !VALOR_UNITARIO) {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'INSERT INTO PEDIDO_PRODUTO (PEDIDO_ID, PRODUTO_ID, QUANTIDADE, VALOR_UNITARIO) VALUES (?, ?, ?, ?)';
  const values = [PEDIDO_ID, PRODUTO_ID, QUANTIDADE, VALOR_UNITARIO];
  connection.query(query, values, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ result, ...req.body });
  });
}

export const updateOrderProduct = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const { PEDIDO_ID, PRODUTO_ID, QUANTIDADE, VALOR_UNITARIO } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!PEDIDO_ID || !PRODUTO_ID || !QUANTIDADE || !VALOR_UNITARIO)  {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'UPDATE PEDIDO_PRODUTO SET PEDIDO_ID = ?, PRODUTO_ID = ?, QUANTIDADE = ?, VALOR_UNITARIO, id = ?';
  const values = [PEDIDO_ID, PRODUTO_ID, QUANTIDADE, VALOR_UNITARIO, id];
  connection.query(query, values, (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
}

export const deleteOrderProduct = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;

  const query = 'DELETE FROM PEDIDO_PRODUTO WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
}

