const mysql   = require('mysql2');
const config  = require('../config/database');

const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
});

const listar = (id, callback) => {
  db.query(`SELECT * FROM CATEGORIAS WHERE CATEGORIAS.ID_USUARIO = ${id}`, (error, results) => {
    if (error) {
      console.error('Erro na consulta:', error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const adicionar = (req, callback) => {
  db.query(`INSERT INTO CATEGORIAS (NOME, ID_USUARIO) VALUE ('${req.body.data.NOME}', ${req.body.data.ID_USUARIO})`, (error, results) => {
    if (error) {
      console.error('Erro ao adicionar:', error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const editar = (req, callback) => {
  db.query(`UPDATE CATEGORIAS SET CATEGORIAS.NOME = '${req.body.data.NOME}' WHERE CATEGORIAS.ID = ${req.body.data.ID}`, (error, results) => {
    if (error) {
      console.error('Erro na consulta:', error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const excluir = (req, callback) => {
  db.query(`DELETE FROM CATEGORIAS WHERE CATEGORIAS.ID = ${req.body.data}`, (error, results) => {
    if (error) {
      console.error('Erro na consulta:', error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = { listar, adicionar, editar, excluir };