import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { LocalizacaoBusiness } from "../business/LocalizacaoBusiness";
import { localizacaoAPIretorno } from "../types/apiRetornoTipos";

export class LocalizacaoController {
  private localizacaoBusiness = new LocalizacaoBusiness();

  buscarLocalizacaoPorParametros = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<localizacaoAPIretorno>();

    try {
      const { exame, setor } = req.query;

      console.log("Controller -> " + exame || setor);

      if (
        (!exame || exame.toString().trim().length === 0) &&
        (!setor || setor.toString().trim().length === 0)
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro 'exame' e 'setor' esta incorreto, não existe ou invalido! e obrigatorio pelo menos 1 filtro de busca",
        );
        responseBuilder.construir(res);
        return;
      }

      if (exame?.toString().replaceAll("'", "").length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro 'exame' precisa ter conteudo, não pode ter apenas characteres especiais",
        );
        responseBuilder.construir(res);
        return;
      }

      if (setor?.toString().replaceAll("'", "").length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro 'setor' precisa ter conteudo, não pode ter apenas characteres especiais",
        );
        responseBuilder.construir(res);
        return;
      }

      await this.localizacaoBusiness.obterLocalizacaoPorParametros(
        responseBuilder,
        exame?.toString().replaceAll("'", ""),
        setor?.toString().replaceAll("'", ""),
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
