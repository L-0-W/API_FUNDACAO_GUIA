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
