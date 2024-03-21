const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dt_estudos', 'admin', 'r#StuV$*s=', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;