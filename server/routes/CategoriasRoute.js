const express = require('express');
const categorias = require('../controllers/CategoriasContoller');
const router = express.Router();

router.post('/listar'   , categorias.listar   );
router.post('/adicionar', categorias.adicionar);
router.post('/editar'   , categorias.editar   );
router.post('/excluir'  , categorias.excluir  );

module.exports = router;