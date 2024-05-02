const express = require('express');
const app = express();
const mysql = require('mysql');
const config = require('./config/database.js');

const cors = require('cors');

// Conexão com o banco de dados
const db = mysql.createConnection(config);

app.use(cors());
app.use(express.json());


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/usuario', (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000!');
});