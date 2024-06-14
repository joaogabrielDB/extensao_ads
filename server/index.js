const express = require('express'             );
const mysql   = require('mysql2'              );
const session = require('express-session'     );
const config  = require('./config/database.js');
const cors    = require('cors'                );

const routeCadastro   = require('./routes/CadastroRoute.js'  );
const routeLogin      = require('./routes/LoginRoute.js'     );
const routeCategorias = require('./routes/CategoriasRoute.js');
const routeDisciplina = require('./routes/DisciplinaRoute.js');
const routeTarefa     = require('./routes/TarefasRoute.js'   );


const app  = express();
const PORT = 3000;
const db   = mysql.createConnection(config);

app.use(cors());
app.use(express.json());

app.use(session({
    secret           : 'aSxaefdb@#41'
  , resave           : false
  , saveUninitialized: true
}));

app.use(cors({
    origin        : 'http://localhost:4200'
  , methods       : ['GET', 'POST']
  , allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/cadastro'  , routeCadastro  );
app.use('/login'     , routeLogin     );
app.use('/categoria' , routeCategorias);
app.use('/disciplina', routeDisciplina);
app.use('/tarefa'    , routeTarefa    );

db.connect((err) => {
  if (err) throw err;
  else console.log('Conectado ao banco de dados MySQL!');
});

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT + '!');
});