const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const config = require('./config/database.js');

const cors = require('cors');

// Conexão com o banco de dados
const db = mysql.createConnection(config);

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'seu segredo aqui',
  resave: false,
  saveUninitialized: true,
}));


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      const comparision = await bcrypt.compare(password, results[0].password)

      if (comparision) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/home');
      } else {
        res.send('Senha incorreta!');
      }
    } else {
      res.send('Usuário não existe!');
    }
  });
});

app.get('/home', (req, res) => {
  if (req.session.loggedin) {
    res.send('Bem vindo de volta, ' + req.session.username + '!');
  } else {
    res.send('Por favor, faça login para ver esta página!');
  }
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