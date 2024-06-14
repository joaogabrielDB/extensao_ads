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
  db.query(`
    SELECT 
      tarefas.ID               ID
    , tarefas.TITULO           TITULO
    , tarefas.DESCRI           DESCRI
    , tarefas.DTCADAST         DTCADAST
    , tarefas.DTENTREGA        DTENTREGA
    , tarefas.ID_CATEGORIA     ID_CATEGORIA
    , categorias.NOME          NOME_CATEGORIA
    , tarefas.ID_DISCIPLINA    ID_DISCIPLINA
    , disciplinas.NOME         NOME_DISCIPLINA
    , disciplinas.PROF         PROF_DISCIPLINA
    , tarefas.ID_USUARIO       ID_USUARIO
    FROM tarefas
    LEFT JOIN CATEGORIAS ON CATEGORIAS.ID = TAREFAS.ID_CATEGORIA
    LEFT JOIN DISCIPLINAS ON DISCIPLINAS.ID = TAREFAS.ID_DISCIPLINA
    WHERE TAREFAS.ID_USUARIO = ${id}
    `, (error, results) => {
    if (error) {
      console.error('Erro na consulta:', error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const adicionar = (req, callback) => {
  db.query(`
          INSERT INTO TAREFAS 
          (TITULO, DESCRI, DTENTREGA,  ID_USUARIO, ID_DISCIPLINA, ID_CATEGORIA) 
          VALUES
          ('${req.body.data.TITULO}', '${req.body.data.DESCRI}', '${req.body.data.DTENTREGA}', 
          ${req.body.data.ID_USUARIO}, ${req.body.data.ID_DISCIPLINA}, ${req.body.data.ID_CATEGORIA})`
          , (error, results) => {
    if (error) {
      console.error('Erro ao adicionar:', error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const editar = (req, callback) => {
  db.query(`UPDATE TAREFAS SET  TAREFAS.TITULO = '${req.body.data.TITULO}'
                              , TAREFAS.DESCRI = '${req.body.data.DESCRI}' 
                              , TAREFAS.DTENTREGA = '${req.body.data.DTENTREGA}' 
                              , TAREFAS.ID_DISCIPLINA = '${req.body.data.ID_DISCIPLINA}'
                              , TAREFAS.ID_CATEGORIA = '${req.body.data.ID_CATEGORIA}'
            WHERE TAREFAS.ID = ${req.body.data.ID}`, (error, results) => {
    if (error) {
      console.error('Erro ao editar:', error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const excluir = (req, callback) => {
  db.query(`DELETE FROM TAREFAS WHERE TAREFAS.ID = ${req.body.data}`, (error, results) => {
    if (error) {
      console.error('Erro ao excluir:', error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = { listar, adicionar, editar, excluir };