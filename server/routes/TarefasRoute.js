const express = require('express');
const tarefa = require('../controllers/TarefasController');
const router = express.Router();

router.post('/listar'   , tarefa.listar   );
router.post('/adicionar', tarefa.adicionar);
router.post('/editar'   , tarefa.editar   );
router.post('/excluir'  , tarefa.excluir  );

module.exports = router;