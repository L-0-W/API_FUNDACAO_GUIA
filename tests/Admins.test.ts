import axios, { AxiosError } from "axios";
import {
  apiRetorno,
  localizacaoAPIretorno,
} from "../src/types/apiRetornoTipos";

const URL = "http://localhost:3003/adminAcao/exame";
const URLlogin = "http://localhost:3003/loginAdmin";

const getStatus = (err: any) => err.response?.status;

describe("Testando EndPoint 'deletarExamePorId'", () => {
  //TESTE E2E
  test("Fazendo teste E2E em deletarExamePorId", async () => {
    const responseLogin = await axios.post(`${URLlogin}`, {
      email: "fluiz7880@gmail.com",
      senha: "12345678",
    });

    expect(responseLogin.status).toBe(200);

    const AUTH_TOKEN = (
      responseLogin.data as apiRetorno<localizacaoAPIretorno>
    ).mensagem?.split("Token Gerado: ")[1] as string;

    const response = await axios.delete(`${URL}/exa-003`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });

    expect(response.status).toBe(200);

    const data = response.data as apiRetorno<localizacaoAPIretorno>;

    expect((data.body as any).sucesso).toBe(true);
    expect((data.body as any).total).toBe(1);
  });
});
