const express = require('express');
const mysql   = require('mysql2');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const session = require('express-session');
const config  = require('./config/database.js');
const cors    = require('cors');
const routeCadastro  = require('./routes/CadastroRoute.js');
const routeLogin  = require('./routes/LoginRoute.js');

const app = express();

const PORT       = 3000;
const saltRounds = 10;

// Conexão com o banco de dados
const db = mysql.createConnection(config);

app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'aSxaefdb@#41',
  resave: false,
  saveUninitialized: true,
}));

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/cadastro', routeCadastro);
app.use('/login', routeLogin);

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query(`SELECT * FROM USUARIOS WHERE EMAIL = '${email}'`, (error, results) => {
    if (error) {
      console.error('Erro na consulta:', error);
      res.status(500).send('Erro no servidor');
      return;
    }

    if (results.length > 0) {
      const verificar = results[0];
      bcrypt.compare(password, verificar.PASSWORD, (err, comparision) => {
        if (err) {
          console.error('Erro ao comparar senhas:', err);
          res.status(500).send('Erro no servidor');
          return;
        }

        if (comparision) {
          req.session.loggedin = true;
          req.session.username = email;
          console.log("Login bem-sucedido");
          res.json({ success: true });
        } else {
          res.send('Senha incorreta!');
        }
      });
    } else {
      res.send('Usuário não existe!');
    }
  });
});

app.get('/home', (req, res) => {
  if (req.session.loggedin)  res.send('Bem vindo de volta, ' + req.session.username + '!');
  else res.send('Por favor, faça login para ver está página!');
});

db.connect((err) => {
  if (err) throw err;
  else console.log('Conectado ao banco de dados MySQL!');
});

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT + '!');
});