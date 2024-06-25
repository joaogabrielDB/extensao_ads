const express = require('express');
const cadastros = require('../controllers/CadastrosController');
const router = express.Router();

router.post('/'      , cadastros.cadastroUsuario);
router.post('/editar', cadastros.editar         );
router.post('/dados' , cadastros.dados          );

module.exports = router;
