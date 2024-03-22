const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_estudos', 'admin', 'r#StuV$*s=', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
