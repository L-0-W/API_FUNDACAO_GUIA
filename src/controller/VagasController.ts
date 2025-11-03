import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { VagasBusiness } from "../business/VagasBusiness";
import { vagasAPIretorno } from "../types/apiRetornoTipos";

export class VagasController {
  private vagasBusiness = new VagasBusiness();
  private responseBuilder = new ResponseBuilder<vagasAPIretorno>();

  buscarTodasVagas = async (req: Request, res: Response) => {
    try {
      await this.vagasBusiness.obterTodasAsVagas(this.responseBuilder);
      this.responseBuilder.construir(res);
    } catch (err: any) {
      this.responseBuilder.adicionarCodigoStatus(
        this.responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      this.responseBuilder.adicionarMensagem(
        `${err.sqlMessage || err.message}`,
      );

      this.responseBuilder.construir(res);
    }
  };

  buscarVagaPorId = async (req: Request, res: Response) => {
    try {
      const vagaId = Number(req.params.id);

      if (!vagaId || !Number.isInteger(vagaId)) {
        this.responseBuilder.adicionarCodigoStatus(
          this.responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        this.responseBuilder.adicionarMensagem(
          "Parametro: 'id' esta incorreto ou faltando!",
        );

        this.responseBuilder.construir(res);
        return;
      }

      await this.vagasBusiness.obterVagaPorId(vagaId, this.responseBuilder);

      this.responseBuilder.construir(res);
    } catch (err: any) {
      this.responseBuilder.adicionarCodigoStatus(
        this.responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      this.responseBuilder.adicionarMensagem(
        `${err.sqlMessage || err.message}`,
      );

      this.responseBuilder.construir(res);
    }
  };
}
