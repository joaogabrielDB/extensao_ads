const dao = require('../dao/CategoriasDAO');

const listar = (req, res)=>{
  // const id = req.body.; 
   const { id } = req.body;
  // const { id } = req;
  let blOk   = true, message = '';
  // const data = dao.listar(id);
  // if (data) {
  //   res.json({ data, blOk });
  // } else {
  //   blOk = false, message = 'Erro ao listar categorias!';
  //   res.json({ blOk, message });
  // }

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

module.exports = { listar };