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
    console.log('Conectado ao banco de dados');
});

const cadastroUsuario = (nome, email, password, callback) => {
    const query = `INSERT INTO USUARIOS (NOME, EMAIL, PASSWORD) VALUES (?, ?, ?)`;
    db.query(query, [nome, email, password], callback);
};

module.exports = { cadastroUsuario };