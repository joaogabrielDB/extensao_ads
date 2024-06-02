const express = require('express');
const cadastros = require('../controllers/CadastrosController');
const router = express.Router();

router.post('/', cadastros.cadastroUsuario);

module.exports = router;
