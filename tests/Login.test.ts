import axios from "axios";
import { AxiosError } from "axios";

import { LoginController } from "../src/controller/LoginController";

const loginController = new LoginController();

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
        email: "fluiz@gmail.com",
        senha: "123@123",
      });
    } catch (err) {
      const response = err as AxiosError;
      expect(response.status).toBe(404);
    }
  });
});
