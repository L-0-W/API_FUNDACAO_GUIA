import axios from "axios";
import { AxiosError } from "axios";

import { EventosController } from "../src/controller/EventosController";
import { EventosData } from "../src/data/EventosData";
import { EventosBusiness } from "../src/business/EventosBusiness";

const eventosController = new EventosController();
const eventosData = new EventosData();
const eventosBusiness = new EventosBusiness();

const spyOnDb = jest.spyOn(eventosData, "buscarEventosPorId");
const spyOnBusiness = jest.spyOn(eventosBusiness, "obterEventoPorId");

describe("Testando EventosController", () => {
  test("deve retornar 400 com parametro 'id' errado", async () => {
    try {
      const response = await axios.get("http://localhost:3003/eventos/'");
    } catch (err) {
      const axiosError = err as AxiosError;

      expect(axiosError.status).toBe(400);
      expect(spyOnDb).toHaveBeenCalledTimes(0);
      expect(spyOnBusiness).toHaveBeenCalledTimes(0);
    }
  });

  test("deve retornar 400 com parametro 'id' que não e inteiro", async () => {
    try {
      const response = await axios.get("http://localhost:3003/eventos/1.1");
    } catch (err) {
      const axiosError = err as AxiosError;

      expect(axiosError.status).toBe(400);
      expect(spyOnDb).toHaveBeenCalledTimes(0);
      expect(spyOnBusiness).toHaveBeenCalledTimes(0);
    }
  });

  test("deve retornar 400 com parametro 'id' que e string", async () => {
    try {
      const response = await axios.get("http://localhost:3003/eventos/bac");
    } catch (err) {
      const axiosError = err as AxiosError;

      expect(axiosError.status).toBe(400);
      expect(spyOnDb).toHaveBeenCalledTimes(0);
      expect(spyOnBusiness).toHaveBeenCalledTimes(0);
    }
  });
});

describe("Testando EventosBusiness", () => {
  test("Verificando se 'id' de um evento que não existe, deve retornar 404", async () => {
    try {
      await axios.get("http://localhost:3003/eventos/99999");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(404);
    }
  });
});
