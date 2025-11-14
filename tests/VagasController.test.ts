import axios, { AxiosError } from "axios";

const URL = "http://localhost:3003/vagas";

describe("Testando EndPoint 'buscarVagaPorId'", () => {
  test.each([
    { id: "'", desc: "caractere inválido" },
    { id: "5.0", desc: "decimal (não inteiro)" },
    { id: "abc", desc: "string (não numérico)" },
  ])("Deve retornar 400 com parametro 'id' com %s", async ({ id, desc }) => {
    try {
      await axios.get(`${URL}/${id}`);
    } catch (err) {
      const axiosError = err as AxiosError;
      expect((axiosError as any).status).toBe(400);
    }
  });

  test("Verificando se 'id' de uma vaga que não existe, deve retornar 404", async () => {
    try {
      await axios.get(`${URL}/99999999`);
    } catch (err) {
      const axiosErr = err as AxiosError;
      expect((axiosErr as any).status).toBe(404);
    }
  });
});

describe("Testando EndPoint 'buscarTodasVagas'", () => {
  test("Deve retornar 200, caso database tenha vagas", async () => {
    const response = await axios.get(`${URL}`);
    expect(response.status).toBe(200);
  });
});

describe("Testando EndPoint 'buscarVagasPorFiltro'", () => {
  test.each([
    { query: "", desc: "nenhuma query foi preenchida" },
    { query: "?recentes", desc: "parâmetro recentes sem valor" },
    { query: "?cidade=", desc: "parâmetro cidade vazio" },
    { query: "?recentes=1.2", desc: "parâmetro recentes não é inteiro" },
    { query: "?recentes=a", desc: "parâmetro recentes não é numérico" },
    {
      query: "?cargo=&cidade=&modalidade=",
      desc: "múltiplos parâmetros vazios",
    },
    { query: "?tipo_vinculo=", desc: "parâmetro tipo_vinculo vazio" },
  ])("Deve retornar erro 400, pois %s (%s)", async ({ query, desc }) => {
    try {
      await axios.get(`${URL}/filtrar${query}`);
    } catch (err) {
      const axiosErr = err as AxiosError;
      expect(axiosErr.status).toBe(400);
    }
  });

  test("Deve retornar 400, parametro tipo_vinculo fora do enum (CLT|PJ|ESTAGIO)", async () => {
    const invalidQuery = "?tipo_vinculo=AUTONOMO";

    try {
      await axios.get(`${URL}/filtrar${invalidQuery}`);
    } catch (err) {
      const axiosErr = err as AxiosError;
      expect((axiosErr as any).status).toBe(400);
    }
  });

  test("Deve retornar 200, com filtros válidos e resultados encontrados", async () => {
    const validQuery = "?recentes=30&tipo_vinculo=CLT";

    const response = await axios.get(`${URL}/filtrar${validQuery}`);
    expect(response.status).toBe(200);
  });

  test("Deve retornar 404, com filtros válidos, mas sem resultados", async () => {
    const validQuery = "?cidade=Inexistente&recentes=30";

    try {
      await axios.get(`${URL}/filtrar${validQuery}`);
    } catch (err) {
      const axiosErr = err as AxiosError;
      expect((axiosErr as any).status).toBe(404);
    }
  });
});
