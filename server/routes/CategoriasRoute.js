const express = require('express');
const categorias = require('../controllers/CategoriasContoller');
const router = express.Router();

router.post('/listar', categorias.listar);

module.exports = router;