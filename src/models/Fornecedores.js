const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Fornecedor extends Model {}

Fornecedor.init(
  {
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
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Fornecedors',
    timestamps: true,
  }
);

module.exports = Fornecedor;
