const dao = require('../dao/CategoriasDAO');

const listar = (req, res)=>{
  const { id } = req.body;
  let blOk   = true, message = '';
  dao.listar(id, (err, result) => {
    if(err) {
      console.log(err);
      message = 'Erro ao criar usuário!';
      res.json({ blOk: false, message });
    }

    if(result) {
      res.json({ data: result, blOk })
    }
  })
}

const adicionar = (req, res)=>{
  let blOk   = true, message = '';
  dao.adicionar(req, (err, result) => {
    if(err) {
      console.log(err);
      message = 'Erro ao criar usuário!';
      res.json({ blOk: false, message });
    }

    if(result) {
      res.json({ data: result, blOk })
    }
  })
}

const editar = (req, res)=>{
  let blOk   = true, message = '';
  dao.editar(req, (err, result) => {
    if(err) {
      console.log(err);
      message = 'Erro ao criar usuário!';
      res.json({ blOk: false, message });
    }

    if(result) {
      res.json({ data: result, blOk })
    }
  })
}

const excluir = (req, res)=>{
  let blOk   = true, message = '';
  dao.excluir(req, (err, result) => {
    if(err) {
      console.log(err);
      message = 'Erro ao deletar usuário!';
      res.json({ blOk: false, message });
    }

    if(result) {
      res.json({ data: result, blOk })
    }
  })
}

module.exports = { listar, adicionar, editar, excluir };