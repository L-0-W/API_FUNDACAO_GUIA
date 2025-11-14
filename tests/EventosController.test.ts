import axios from "axios";
import { AxiosError } from "axios";
import { EventosController } from "../src/controller/EventosController";

const eventosController = new EventosController();

describe("Testando EventosController", () => {
  test("deve retornar erro com parametro 'id' errado", async () => {
    try {
      const response = await axios.get("http://localhost:3003/eventos/'");
    } catch (err) {
      const axiosError = err as AxiosError;
      expect(axiosError.status).toBe(400);
    }
  });
});
