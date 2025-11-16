import axios, { AxiosError } from "axios";

const URL = "http://localhost:3003/adminAcao/exame";

const getStatus = (err: any) => err.response?.status;

const AUTH_TOKEN = "Bearer token-de-teste-valido";
const INVALID_TOKEN = "Bearer token-de-teste-invalido";

describe("Testando EndPoint 'deletarExamePorId'", () => {
  test.each([
    { id: "'", desc: "caractere inválido" },
    { id: "abc", desc: "string (não numérico)" },
  ])("Deve retornar 400 com parametro 'id' com %s", async ({ id, desc }) => {
    try {
      await axios.delete(`${URL}/${id}`, {
        headers: { Authorization: AUTH_TOKEN },
      });
      throw new Error(
        `Esperado status 400 para id='${id}', mas a requisição foi bem-sucedida.`,
      );
    } catch (err) {
      const status = getStatus(err as AxiosError);
      expect(status).toBe(400);
    }
  });
});
