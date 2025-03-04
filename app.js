require('dotenv').config();

const express = require('express');
const cors = require("cors");
const sequelize = require('./src/config/db'); 
const { Sequelize, Op } = require('sequelize');
const Fornecedor = require('./src/models/Fornecedores');

const app = express();
app.use(cors()); // Habilita CORS antes das rotas
app.use(express.json());

// Endpoint para listar fornecedores
app.get('/fornecedores', async (req, res) => {
  try {
    const fornecedores = await Fornecedor.findAll();
    res.json(fornecedores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar fornecedores' });
  }
});

app.get('/fornecedores-por-consumo', async (req, res) => {
  const { consumoMensal } = req.query;

  try {
    if (!consumoMensal || isNaN(consumoMensal)) {
      return res.status(400).json({ error: 'O consumo mensal deve ser um número válido.' });
    }

    const consumo = parseFloat(consumoMensal);

    const fornecedores = await Fornecedor.findAll({
      where: {
        limiteMinimoKwh: {
          [Sequelize.Op.lt]: consumo,
        },
      },
    });

    if (fornecedores.length === 0) {
      return res.status(404).json({ error: 'Nenhum fornecedor encontrado para o consumo mensal informado.' });
    }

    res.json(fornecedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar fornecedores' });
  }
});

//Endpoint para cadastrar fornecedor
app.post('/setFornecedor', async (req, res) => {
  const { nome, logo, estado, custoPorKwh, limiteMinimoKwh, numeroClientes, avaliacaoMedia } = req.body;

  try {
    if (!nome || !estado || !custoPorKwh || !limiteMinimoKwh || !numeroClientes || !avaliacaoMedia) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    const novoFornecedor = await Fornecedor.create({
      nome,
      logo,
      estado,
      custoPorKwh,
      limiteMinimoKwh,
      numeroClientes,
      avaliacaoMedia,
    });

    res.status(201).json(novoFornecedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar fornecedor' });
  }
});


// Sincronizar o banco e rodar o servidor
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
