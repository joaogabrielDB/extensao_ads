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

const cadastroUsuario = (nome, email, password, callback) => {
    const query = `INSERT INTO USUARIOS (NOME, EMAIL, PASSWORD) VALUES (?, ?, ?)`;
    db.query(query, [nome, email, password], callback);
};

const dados = (id, callback) => {
    db.query(`SELECT * FROM USUARIOS WHERE ID = ${id}`, (error, result) => {
        if (error) {
            console.error('Erro na consulta:', error);
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

const editarSenha = (req, callback) => {
    db.query(`UPDATE USUARIOS SET USUARIOS.NOME = '${req.body.data.NOME}', USUARIOS.EMAIL = '${req.body.data.EMAIL}',
        USUARIOS.PASSWORD = '${req.body.data.PASSWORD}'  WHERE USUARIOS.ID = ${req.body.data.ID}`, (error, results) => {
      if (error) {
        console.error('Erro na consulta:', error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
};

const editar = (req, callback) => {
    db.query(`UPDATE USUARIOS SET USUARIOS.NOME = '${req.body.data.NOME}', USUARIOS.EMAIL = '${req.body.data.EMAIL}'
              WHERE USUARIOS.ID = ${req.body.data.ID}`, (error, results) => {
      if (error) {
        console.error('Erro na consulta:', error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
};

module.exports = { cadastroUsuario, dados, editar, editarSenha };