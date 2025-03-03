const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./db');
const Fornecedor = require('./models/Fornecedores');

dotenv.config();

const app = express();
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

// Sincronizar o banco e rodar o servidor
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
