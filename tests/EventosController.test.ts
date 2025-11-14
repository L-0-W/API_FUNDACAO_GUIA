import axios from "axios";
import { AxiosError } from "axios";

import { EventosController } from "../src/controller/EventosController";
import { EventosData } from "../src/data/EventosData";

const eventosController = new EventosController();
const eventosData = new EventosData();

describe("Testando EndPoint 'buscarPorId' ", () => {
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

  test("Verificando se 'id' de um evento que não existe, deve retornar 404", async () => {
    try {
      await axios.get("http://localhost:3003/eventos/99999999");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(404);
    }
  });

  test("Deve retornar 200 caso existe algum usuario", async () => {
    try {
      await axios.get("http://localhost:3003/eventos/1");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(200);
    }
  });
});

describe("Testando EndPoint 'buscarTodosEventos' ", () => {
  test("deve retornar 200, caso database tenha eventos", async () => {
    try {
      await axios.get("http://localhost:3003/eventos");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(200);
    }
  });
});

describe("Testando EndPoint 'buscarEventosPorQuery' ", () => {
  test("Deve retornar erro 400, nemhuma query foi preenchida", async () => {
    try {
      await axios.get("http://localhost:3003/eventos/filtrar");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(400);
    }
  });

  test("Deve retornar erro 400, parametro dias foi especificado mas esta vazio", async () => {
    try {
      await axios.get("http://localhost:3003/eventos/filtrar?dias");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(400);
    }
  });

  test("Deve retornar erro 400, parametro dias foi especificado mas esta vazio", async () => {
    try {
      await axios.get("http://localhost:3003/eventos/filtrar?dias=   ");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(400);
    }
  });

  test("Deve retornar erro 400, parametro dias não e um inteiro", async () => {
    try {
      await axios.get("http://localhost:3003/eventos/filtrar?dias=a");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(400);
    }
  });

  test("Deve retornar erro 400, parametro dias não e um inteiro", async () => {
    try {
      await axios.get("http://localhost:3003/eventos/filtrar?dias=1.2");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(400);
    }
  });

  test("Deve retornar erro 400, parametro dias foi especificado mas esta vazio", async () => {
    try {
      await axios.get(
        "http://localhost:3003/eventos/filtrar?status=em_andamento&dias",
      );
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(400);
    }
  });

  test("Deve retornar erro 400, parametro status foi especificado mas esta vazio", async () => {
    try {
      await axios.get("http://localhost:3003/eventos/filtrar?status=");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(400);
    }
  });

  test("Deve retornar erro 400, parametro tags foi especificado mas esta vazio", async () => {
    try {
      await axios.get("http://localhost:3003/eventos/filtrar?tags=");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(400);
    }
  });

  test("Deve retornar erro 400, tudo especificado mas vazio", async () => {
    try {
      await axios.get(
        "http://localhost:3003/eventos/filtrar?tags=&status=&dias",
      );
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(400);
    }
  });

  test("Deve retornar 200, parametro dias preenchido, casa datbase tenha eventos com esse filtro", async () => {
    try {
      await axios.get("http://localhost:3003/eventos/filtrar?dias=10");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(200);
    }
  });

  test("Deve retornar 200, parametro status preenchido, casa datbase tenha eventos com esse filtro", async () => {
    try {
      await axios.get(
        "http://localhost:3003/eventos/filtrar?status=em_andamento",
      );
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(200);
    }
  });

  test("Deve retornar 400, parametro status fora do enum", async () => {
    try {
      await axios.get("http://localhost:3003/eventos/filtrar?status=abu");
    } catch (err) {
      const axiosErr = err as AxiosError;

      expect(axiosErr.status).toBe(400);
    }
  });
});
