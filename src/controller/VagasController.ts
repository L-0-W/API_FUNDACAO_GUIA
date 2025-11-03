import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { VagasBusiness } from "../business/VagasBusiness";
import { vagasAPIretorno } from "../types/apiRetornoTipos";

export class VagasController {
  private vagasBusiness = new VagasBusiness();

  buscarTodasVagas = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<vagasAPIretorno>();

    try {
      await this.vagasBusiness.obterTodasAsVagas(responseBuilder);
      responseBuilder.construir(res);
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      responseBuilder.adicionarMensagem(`${err.sqlMessage || err.message}`);

      responseBuilder.construir(res);
    }
  };

  buscarVagaPorId = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<vagasAPIretorno>();

    try {
      const vagaId = Number(req.params.id);

      if (!vagaId || !Number.isInteger(vagaId)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro: 'id' esta incorreto ou faltando!",
        );

        responseBuilder.construir(res);
        return;
      }

      await this.vagasBusiness.obterVagaPorId(vagaId, responseBuilder);

      responseBuilder.construir(res);
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      responseBuilder.adicionarMensagem(`${err.sqlMessage || err.message}`);

      responseBuilder.construir(res);
    }
  };
}
