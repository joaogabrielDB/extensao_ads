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


module.exports = { cadastroUsuario };