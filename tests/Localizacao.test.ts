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
});
