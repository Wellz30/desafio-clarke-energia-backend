require('dotenv').config(); // Carregue as variáveis de ambiente primeiro!

const express = require('express');
const sequelize = require('./src/config/db'); 
const Fornecedor = require('./src/models/Fornecedores');

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

//Endpoint para cadastrar fornecedor
app.post('/setFornecedor', async (req, res) => {
  const { nome, logo, estado, custoPorKwh, limiteMinimoKwh, numeroClientes, avaliacaoMedia } = req.body;

  try {
    // Validar os dados antes de salvar
    if (!nome || !estado || !custoPorKwh || !limiteMinimoKwh || !numeroClientes || !avaliacaoMedia) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    // Criar o fornecedor
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
