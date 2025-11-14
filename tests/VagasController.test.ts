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
});
