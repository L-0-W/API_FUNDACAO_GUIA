import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { EventosBusiness } from "../business/EventosBusiness";
import { eventosAPIretorno } from "../types/apiRetornoTipos";
import {
  catchErros,
  filtragemEventos,
  filtragemEventosStatus,
} from "../types/entidades";

export class EventosController {
  public eventosBusiness = new EventosBusiness();

  buscarTodosEventos = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<eventosAPIretorno>();

    try {
      await this.eventosBusiness.obterTodosEventos(responseBuilder);
      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message === catchErros.CLIENTE) {
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

  buscarEventosPorQuery = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<eventosAPIretorno>();

    try {
      const { status, dias, tags } = req.query;

      if (!status && !dias && !tags) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "E Obrigatorio inserir pelo menos 1 dos filtros para pesquisa",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (dias?.length != undefined && dias.toString().trim().length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Filtro dias não pode ser apenas espaços ou estar vazio!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (tags?.length != undefined && tags.toString().trim().length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Filtro tags não pode ser apenas espaços ou estar vazio!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (
        status?.length != undefined &&
        status.toString().trim().length === 0
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Filtro status não pode ser apenas espaços ou estar vazio!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      const diasN = Number(dias);

      if (dias?.length != undefined && !Number.isInteger(diasN)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem("Filtro dias Precisa ser um inteiro");

        throw new Error(catchErros.CLIENTE);
      }

      const filtros: filtragemEventos = {
        status: status?.toString() || filtragemEventosStatus.Vazio,
        dias: diasN,
        tags: tags?.toString().replaceAll("'", "") || "",
      };

      await this.eventosBusiness.obterEventosPorFiltragem(
        filtros,
        responseBuilder,
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
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

        throw new Error(catchErros.CLIENTE);
      }

      await this.eventosBusiness.obterEventoPorId(eventoId, responseBuilder);

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
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
