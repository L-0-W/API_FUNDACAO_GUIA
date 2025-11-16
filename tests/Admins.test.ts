import axios, { AxiosError } from "axios";
import {
  apiRetorno,
  localizacaoAPIretorno,
} from "../src/types/apiRetornoTipos";

const URL = "http://localhost:3003/adminAcao/exame";
const URLlogin = "http://localhost:3003/loginAdmin";

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

  //TESTE E2E
  test("Fazendo teste E2E em deletarExamePorId", async () => {
    const responseLogin = await axios.post(`${URLlogin}`, {
      email: "fluiz7880@gmail.com",
      senha: "12345678",
    });

    expect(responseLogin.status).toBe(200);

    const AUTH_TOKEN = (
      responseLogin as apiRetorno<localizacaoAPIretorno>
    ).mensagem?.split("Token Gerado: ")[0] as string;
    const response = await axios.delete(`${URL}/1`, {
      headers: { Authorization: AUTH_TOKEN },
    });
  });
});
