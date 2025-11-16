import axios from "axios";
import { AxiosError } from "axios";
import { ResponseBuilder } from "../src/ResponseBuilder";
import {
  apiRetorno,
  localizacaoAPIretorno,
} from "../src/types/apiRetornoTipos";

const URL = "http://localhost:3003/loginAdmin";

describe("Testando 'login'", () => {
  test("Testando sem passar body, deve retornar 400", async () => {
    try {
      await axios.post(URL, {});
    } catch (err) {
      const response = err as AxiosError;
      expect(response.status).toBe(400);
    }
  });

  test("Testando passar body vazio, deve retornar 400", async () => {
    try {
      await axios.post(URL, {
        email: "",
        senha: "",
      });
    } catch (err) {
      const response = err as AxiosError;
      expect(response.status).toBe(400);
    }
  });

  test("Testando admin não deve existir, deve retornar 404", async () => {
    try {
      await axios.post(URL, {
        email: "bubaiaga.com",
        senha: "123@123",
      });
    } catch (err) {
      const response = err as AxiosError;
      expect(response.status).toBe(404);
    }
  });

  test("Testando admin com senha errada, deve retornar 401", async () => {
    try {
      await axios.post(URL, {
        email: "fluiz@gmail.com",
        senha: "123@123",
      });
    } catch (err) {
      const response = err as AxiosError;
      expect(response.status).toBe(404);
    }
  });

  test("Testando admin tudo correto, deve retornar 200 e message de token gerado", async () => {
    try {
      await axios.post(URL, {
        email: "fluiz7880@gmail.com",
        senha: "12345678",
      });
    } catch (err) {
      const response = err as AxiosError;
      const responseBuilder =
        response.response as unknown as apiRetorno<localizacaoAPIretorno>;

      expect(response.status).toBe(200);
      //expect(responseBuilder.mensagem).toContain("Token Gerado");
    }
  });
});
