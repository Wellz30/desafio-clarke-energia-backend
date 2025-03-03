const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Modelo de fornecedor
const Fornecedor = sequelize.define('Fornecedor', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  custoPorKwh: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  limiteMinimoKwh: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numeroClientes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  avaliacaoMedia: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = Fornecedor;
