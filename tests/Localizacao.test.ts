import axios from "axios";
import { AxiosError } from "axios";

import { LocalizacaoController } from "../src/controller/LocalizacaoController";

const localizacaoController = new LocalizacaoController();

const URL = "http://localhost:3003/localizacao";

describe("Testando 'buscarLocalizacaoPorParametros'", () => {
  test("Teste sem passar nemhum parametro, deve retornar erro 400", async () => {
    try {
      await axios.get(URL);
    } catch (err) {
      const responseErr = err as AxiosError;

      expect(responseErr.status).toBe(400);
    }
  });

  test("Teste passando parametro setor vazio, deve retornar erro 400", async () => {
    try {
      await axios.get(URL + "?setor=");
    } catch (err) {
      const responseErr = err as AxiosError;
      expect(responseErr.status).toBe(400);
    }
  });

  test("Teste passando parametro bloco vazio, deve retornar erro 400", async () => {
    try {
      await axios.get(URL + "?bloco=");
    } catch (err) {
      const responseErr = err as AxiosError;
      expect(responseErr.status).toBe(400);
    }
  });

  test("Teste passando parametro exame vazio, deve retornar erro 400", async () => {
    try {
      await axios.get(URL + "?exame=");
    } catch (err) {
      const responseErr = err as AxiosError;
      expect(responseErr.status).toBe(400);
    }
  });

  test("Teste passando parametro exame, tal exame não deve existir, e deve retornar 404", async () => {
    try {
      await axios.get(URL + "?exame=bugabuga");
    } catch (err) {
      const responseErr = err as AxiosError;
      expect(responseErr.status).toBe(404);
    }
  });

  test("Teste passando parametro setor, tal exame não deve existir, e deve retornar 404", async () => {
    try {
      await axios.get(URL + "?setor=bugabuga");
    } catch (err) {
      const responseErr = err as AxiosError;
      expect(responseErr.status).toBe(404);
    }
  });

  test("Teste passando parametro bloco, tal exame não deve existir, e deve retornar 404", async () => {
    try {
      await axios.get(URL + "?bloco=bugabuga");
    } catch (err) {
      const responseErr = err as AxiosError;
      expect(responseErr.status).toBe(404);
    }
  });
});
