import axios, { AxiosError } from "axios";

const URL = "http://localhost:3003/noticias";

const getStatus = (err: any) => err.response?.status;

describe("Testando EndPoint 'buscarNoticias' (Busca e Filtros)", () => {
  test.each([
    { query: "?recentes=abc", desc: "parâmetro 'recentes' não é numérico" },
    {
      query: "?recentes=5.5",
      desc: "parâmetro 'recentes' não é inteiro/decimal",
    },
    { query: "?tags=", desc: "parâmetro 'tags' vazio" },
    { query: "?tags= ", desc: "parâmetro 'tags' com apenas espaços" },
    { query: "?tags=,", desc: "parâmetro 'tags' com apenas vírgulas" },
  ])(
    "Deve retornar 400 para parâmetro inválido: %s (%s)",
    async ({ query, desc }) => {
      try {
        await axios.get(`${URL}${query}`);
        throw new Error(
          `Esperado status 400, mas a requisição foi bem-sucedida para: ${desc}`,
        );
      } catch (err) {
        const status = getStatus(err as AxiosError);
        expect(status).toBe(400);
      }
    },
  );

  test("Deve retornar 200, caso o database tenha notícias nos últimos 30 dias (Busca Padrão)", async () => {
    const response = await axios.get(URL);
    expect(response.status).toBe(200);
    expect(response.data.data.noticias).toBeInstanceOf(Array);
  });

  test("Deve retornar 200, com filtros válidos", async () => {
    const validQuery = "?recentes=7&setor=financas&tags=imposto,renda";
    const response = await axios.get(`${URL}${validQuery}`);
    expect(response.status).toBe(200);
  });

  test("Deve retornar 200, com filtros válidos e resultados encontrados", async () => {
    const validQuery = "?recentes=7&setor=financas&tags=imposto,renda";

    const response = await axios.get(`${URL}${validQuery}`);
    expect(response.status).toBe(200);
    expect(response.data.data.noticias).toBeInstanceOf(Array);
  });
});
