const express = require('express');
const disciplina = require('../controllers/DisciplinaController');
const router = express.Router();

router.post('/listar'   , disciplina.listar   );
router.post('/adicionar', disciplina.adicionar);
router.post('/editar'   , disciplina.editar   );
router.post('/excluir'  , disciplina.excluir  );

module.exports = router;