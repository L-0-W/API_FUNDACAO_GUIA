import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { LocalizacaoBusiness } from "../business/LocalizacaoBusiness";
import { localizacaoAPIretorno } from "../types/apiRetornoTipos";

export class LocalizacaoController {
  private localizacaoBusiness = new LocalizacaoBusiness();

  buscarLocalizacaoPorParametros = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<localizacaoAPIretorno>();

    try {
      const { exame } = req.query;

      if (!exame || exame.toString().trim().length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro 'exame' esta incorreto, não existe ou invalido!",
        );
        responseBuilder.construir(res);
        return;
      }

      await this.localizacaoBusiness.obterLocalizacaoPorParametros(
        exame.toString(),
        responseBuilder,
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
      responseBuilder.construir(res);
    }
  };
}
