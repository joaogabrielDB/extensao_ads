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
  // const result = db.query(query);
  // return result;
};

module.exports = { listar };