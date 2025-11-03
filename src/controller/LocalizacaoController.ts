import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { LocalizacaoBusiness } from "../business/LocalizacaoBusiness";
import { localizacaoAPIretorno } from "../types/apiRetornoTipos";

export class LocalizacaoController {
  private localizacaoBusiness = new LocalizacaoBusiness();
  private responseBuilder = new ResponseBuilder<localizacaoAPIretorno>();

  buscarLocalizacaoPorParametros = async (req: Request, res: Response) => {
    try {
      const { exame } = req.query;

      if (!exame || exame.toString().trim().length === 0) {
        this.responseBuilder.adicionarCodigoStatus(
          this.responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        this.responseBuilder.adicionarMensagem(
          "Parametro 'exame' esta incorreto, não existe ou invalido!",
        );
        this.responseBuilder.construir(res);
        return;
      }

      await this.localizacaoBusiness.obterLocalizacaoPorParametros(
        exame.toString(),
        this.responseBuilder,
      );

      this.responseBuilder.construir(res);
    } catch (err: any) {
      this.responseBuilder.adicionarCodigoStatus(
        this.responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      this.responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
      this.responseBuilder.construir(res);
    }
  };
}
