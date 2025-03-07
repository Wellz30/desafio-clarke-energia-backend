const request = require("supertest");
const app = require("../app");

describe("Testando API de Fornecedores", () => {
  it("Deve retornar status 200 ao buscar todos os fornecedores", async () => {
    const res = await request(app).get("/fornecedores");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Deve retornar status 200 e uma lista filtrada de fornecedores", async () => {
    const consumoMensal = 500;
    const res = await request(app).get(`/fornecedores-por-consumo?consumoMensal=${consumoMensal}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Deve retornar status 400 se o consumo mensal não for um número válido", async () => {
    const res = await request(app).get("/fornecedores-por-consumo?consumoMensal=abc");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("Deve cadastrar um novo fornecedor e retornar status 201", async () => {
    const novoFornecedor = {
      nome: "Fornecedor Teste",
      logo: "https://example.com/logo.png",
      estado: "SP",
      custoPorKwh: 0.45,
      limiteMinimoKwh: 300,
      numeroClientes: 2000,
      avaliacaoMedia: 4.5,
    };

    const res = await request(app)
      .post("/setFornecedor")
      .send(novoFornecedor);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.nome).toBe(novoFornecedor.nome);
  });

  it("Deve retornar erro 400 ao tentar cadastrar fornecedor com dados incompletos", async () => {
    const fornecedorInvalido = {
      nome: "Fornecedor Incompleto",
      estado: "SP",
    };

    const res = await request(app)
      .post("/setFornecedor")
      .send(fornecedorInvalido);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});


