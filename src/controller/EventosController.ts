import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { EventosBusiness } from "../business/EventosBusiness";
import { eventosAPIretorno } from "../types/apiRetornoTipos";

export class EventosController {
  private eventosBusiness = new EventosBusiness();

  buscarTodosEventos = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<eventosAPIretorno>();

    try {
      await this.eventosBusiness.obterTodosEventos(responseBuilder);
      responseBuilder.construir(res);
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
      responseBuilder.construir(res);
    }
  };

  pegarEventoPorId = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<eventosAPIretorno>();

    try {
      const eventoId = Number(req.params.id);

      if (isNaN(eventoId) || !Number.isInteger(eventoId)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "O parametro 'id' precisa ser um numero inteiro!",
        );

        responseBuilder.construir(res);
        return;
      }

      await this.eventosBusiness.obterEventoPorId(eventoId, responseBuilder);

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
