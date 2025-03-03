const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,  // Nome do banco de dados
  process.env.MYSQL_USER,      // Usuário
  process.env.MYSQL_PASSWORD,  // Senha
  {
    host: process.env.MYSQL_HOST,   // Host
    port: process.env.MYSQL_PORT,   // Porta
    dialect: 'mysql',               // Tipo de banco de dados
  }
);


sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;
