import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { LocalizacaoBusiness } from "../business/LocalizacaoBusiness";
import { localizacaoAPIretorno } from "../types/apiRetornoTipos";
import { catchErros } from "../types/entidades";

export class LocalizacaoController {
  private localizacaoBusiness = new LocalizacaoBusiness();

  buscarLocalizacaoPorParametros = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<localizacaoAPIretorno>();

    try {
      const { exame, setor, bloco } = req.query;

      console.log("Controller -> " + exame || setor);

      if (
        (!exame || exame.toString().trim().length === 0) &&
        (!setor || setor.toString().trim().length === 0) &&
        (!bloco || bloco.toString().trim().length === 0)
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro 'exame', 'setor' e 'bloco'  esta incorreto, não existe ou invalido! e obrigatorio pelo menos 1 filtro de busca",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (exame?.toString().replaceAll("'", "").length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro 'exame' precisa ter conteudo, não pode ter apenas characteres especiais",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (setor?.toString().replaceAll("'", "").length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro 'setor' precisa ter conteudo, não pode ter apenas characteres especiais",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (bloco?.toString().replaceAll("'", "").length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro 'bloco' precisa ter conteudo, não pode ter apenas characteres especiais",
        );

        throw new Error(catchErros.CLIENTE);
      }

      await this.localizacaoBusiness.obterLocalizacaoPorParametros(
        responseBuilder,
        exame?.toString().replaceAll("'", ""),
        setor?.toString().replaceAll("'", ""),
        bloco?.toString().replaceAll("'", ""),
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      if ((err.message = catchErros.CLIENTE)) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );

        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
        responseBuilder.construir(res);
      }
    }
  };
}
