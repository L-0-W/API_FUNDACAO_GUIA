import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { EventosBusiness } from "../business/EventosBusiness";
import { eventosAPIretorno } from "../types/apiRetornoTipos";
import { filtragemEventos, filtragemEventosStatus } from "../types/entidades";

export class EventosController {
  private eventosBusiness = new EventosBusiness();
  private responseBuilder = new ResponseBuilder<eventosAPIretorno>();

  buscarTodosEventos = async (req: Request, res: Response) => {
    try {
      await this.eventosBusiness.obterTodosEventos(this.responseBuilder);
      this.responseBuilder.build(res);
    } catch (err: any) {
      this.responseBuilder.adicionarCodigoStatus(
        this.responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      this.responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
      this.responseBuilder.build(res);
    }
  };

  buscarEventosPorQuery = async (req: Request, res: Response) => {
    try {
      const { status, dias, tags } = req.query;

      if (!status && !dias && !tags) {
        this.responseBuilder.adicionarCodigoStatus(
          this.responseBuilder.STATUS_CODE_BAD_REQUEST,
        );
        this.responseBuilder.adicionarMensagem(
          "E Obrigatorio inserir pelo menos 1 dos filtros para pesquisa",
        );
        this.responseBuilder.build(res);

        return;
      }

      if (dias?.length != undefined && dias.toString().trim().length === 0) {
        this.responseBuilder.adicionarCodigoStatus(
          this.responseBuilder.STATUS_CODE_BAD_REQUEST,
        );
        this.responseBuilder.adicionarMensagem(
          "Filtro dias não pode ser apenas espaços ou estar vazio!",
        );
        this.responseBuilder.build(res);
        return;
      }

      if (tags?.length != undefined && tags.toString().trim().length === 0) {
        this.responseBuilder.adicionarCodigoStatus(
          this.responseBuilder.STATUS_CODE_BAD_REQUEST,
        );
        this.responseBuilder.adicionarMensagem(
          "Filtro tags não pode ser apenas espaços ou estar vazio!",
        );
        this.responseBuilder.build(res);
        return;
      }

      if (
        status?.length != undefined &&
        status.toString().trim().length === 0
      ) {
        this.responseBuilder.adicionarCodigoStatus(
          this.responseBuilder.STATUS_CODE_BAD_REQUEST,
        );
        this.responseBuilder.adicionarMensagem(
          "Filtro status não pode ser apenas espaços ou estar vazio!",
        );
        this.responseBuilder.build(res);
        return;
      }

      const diasN = Number(dias);

      if (dias?.length != undefined && !Number.isInteger(diasN)) {
        this.responseBuilder.adicionarCodigoStatus(
          this.responseBuilder.STATUS_CODE_BAD_REQUEST,
        );
        this.responseBuilder.adicionarMensagem(
          "Filtro dias Precisa ser um inteiro",
        );
        this.responseBuilder.build(res);
        return;
      }

      const filtros: filtragemEventos = {
        status: status?.toString() || filtragemEventosStatus.Vazio,
        dias: diasN,
        tags: tags?.toString().replaceAll("'", "") || "",
      };

      await this.eventosBusiness.obterEventosPorFiltragem(
        filtros,
        this.responseBuilder,
      );

      this.responseBuilder.build(res);
    } catch (err: any) {
      this.responseBuilder.adicionarCodigoStatus(
        this.responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      this.responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
      this.responseBuilder.build(res);
    }
  };

  pegarEventoPorId = async (req: Request, res: Response) => {
    try {
      const eventoId = Number(req.params.id);

      if (isNaN(eventoId) || !Number.isInteger(eventoId)) {
        this.responseBuilder.adicionarCodigoStatus(
          this.responseBuilder.STATUS_CODE_BAD_REQUEST,
        );

        this.responseBuilder.adicionarMensagem(
          "O parametro 'id' precisa ser um numero inteiro!",
        );

        this.responseBuilder.build(res);
        return;
      }

      await this.eventosBusiness.obterEventoPorId(
        eventoId,
        this.responseBuilder,
      );

      this.responseBuilder.build(res);
    } catch (err: any) {
      this.responseBuilder.adicionarCodigoStatus(
        this.responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      this.responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
      this.responseBuilder.build(res);
    }
  };
}
