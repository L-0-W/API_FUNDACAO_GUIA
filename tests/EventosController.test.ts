import axios from "axios";
import { AxiosError } from "axios";
import { EventosController } from "../src/controller/EventosController";

const eventosController = new EventosController();

describe("Testando EventosController", () => {
  test("deve retornar 400 com parametro 'id' errado", async () => {
    try {
      const response = await axios.get("http://localhost:3003/eventos/'");
    } catch (err) {
      const axiosError = err as AxiosError;
      expect(axiosError.status).toBe(400);
    }
  });

  test("deve retornar 400 com parametro 'id' que não e inteiro", async () => {
    try {
      const response = await axios.get("http://localhost:3003/eventos/1.1");
    } catch (err) {
      const axiosError = err as AxiosError;
      expect(axiosError.status).toBe(400);
    }
  });

  test("deve retornar 400 com parametro 'id' que e string", async () => {
    try {
      const response = await axios.get("http://localhost:3003/eventos/bac");
    } catch (err) {
      const axiosError = err as AxiosError;
      expect(axiosError.status).toBe(400);
    }
  });
});

describe("Testando EventosController", () => {});
