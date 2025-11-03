import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { EventosBusiness } from "../business/EventosBusiness";
import { eventosAPIretorno } from "../types/apiRetornoTipos";

export class EventosController {
  private eventosBusiness = new EventosBusiness();
  private responseBuilder = new ResponseBuilder<eventosAPIretorno>();

  buscarTodosEventos = async (req: Request, res: Response) => {
    try {
      await this.eventosBusiness.obterTodosEventos(this.responseBuilder);
      this.responseBuilder.construir(res);
    } catch (err: any) {
      this.responseBuilder.adicionarCodigoStatus(
        this.responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      this.responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
      this.responseBuilder.construir(res);
    }
  };

  pegarEventoPorId = async (req: Request, res: Response) => {
    try {
      const eventoId = Number(req.params.id);

      if (isNaN(eventoId) || !Number.isInteger(eventoId)) {
        this.responseBuilder.adicionarCodigoStatus(
          this.responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        this.responseBuilder.adicionarMensagem(
          "O parametro 'id' precisa ser um numero inteiro!",
        );

        this.responseBuilder.construir(res);
        return;
      }

      await this.eventosBusiness.obterEventoPorId(
        eventoId,
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
