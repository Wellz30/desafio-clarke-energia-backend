// src/models/Fornecedores.js
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
      type: DataTypes.STRING, // Aqui você pode armazenar a URL ou o caminho para o logo
      allowNull: true, // Logo pode ser opcional
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
    timestamps: true, // Para garantir que o createdAt e updatedAt sejam gerados automaticamente
  }
);

module.exports = Fornecedor;
