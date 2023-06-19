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


export const getOrder = (req: Request, res: Response, next: NextFunction) => {
  const query = 'SELECT * FROM PEDIDO';
  connection.query(query, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
}

export const getOrderById = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const query = 'SELECT * FROM PEDIDO WHERE id = ?';
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

export const createOrder = (req: Request, res: Response, next: NextFunction) => { 
  const { VALOR_TOTAL, CLIENTE_ID } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!VALOR_TOTAL || !CLIENTE_ID) {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'INSERT INTO PEDIDO (VALOR_TOTAL, CLIENTE_ID) VALUES (?, ?)';
  const values = [VALOR_TOTAL, CLIENTE_ID];
  connection.query(query, values, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ result, ...req.body });
  });
}

export const updateOrder = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const { VALOR_TOTAL, CLIENTE_ID } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!VALOR_TOTAL || !CLIENTE_ID)  {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'UPDATE PEDIDO SET VALOR_TOTAL = ?, CLIENTE_ID = ?, id = ?';
  const values = [VALOR_TOTAL, CLIENTE_ID, id];
  connection.query(query, values, (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
}

export const deleteOrder = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;

  const query = 'DELETE FROM PEDIDO WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
}

