const bcrypt = require('bcrypt');
const userDAO = require('../dao/CadastrosDAO');
const saltRounds = 10;

const cadastroUsuario = (req, res)=>{
  const { name, email, password } = req.body; 
  let blOk = true, message = '';

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      message = 'Erro ao criptografar a senha!';
      res.json({ blOk: false, message });
    }

    userDAO.cadastroUsuario(name, email, hash, (err, result) => {
      if (err) {
        console.log(err);
        message = 'Erro ao criar usuário!';
        res.json({ blOk: false, message });
      }
      message = 'Cadastro realizado com sucesso!';
      res.json({ blOk, message });
    });
  });
}

const dados = (req, res) => {
  const id = req.body.id;
  let blOk = true, message = '';
  userDAO.dados(id, (err, result) => {
    if (err) {
      console.log(err);
      message = 'Erro ao buscar dados do usuário!';
      res.json({ blOk: false, message });
    }
    res.json({ blOk, data: result });
  })
}

const editar = (req, res)=>{
  let blOk   = true, message = '';
  if(req.body.data.PASSWORD) {
    bcrypt.hash(req.body.data.PASSWORD, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        message = 'Erro ao criptografar a senha!';
        res.json({ blOk: false, message });
      }
  
      req.body.data.PASSWORD = hash;
      userDAO.editarSenha(req, (err, result) => {
        if (err) {
          console.log(err);
          message = 'Erro ao editar usuário!';
          res.json({ blOk: false, message });
        }
        message = 'Usuário editado com sucesso!';
        res.json({ blOk, message });
      });
    });
  } else {
    userDAO.editar(req, (err, result) => {
      if(err) {
        console.log(err);
        message = 'Erro ao editar usuário!';
        res.json({ blOk: false, message });
      }
  
      if(result) {
        message = 'Usuário editado com sucesso!';
        res.json({ blOk, message })
      }
    });
  }
}

module.exports = { cadastroUsuario, dados, editar };