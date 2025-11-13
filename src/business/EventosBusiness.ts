import { toUnicode } from "node:punycode";
import { EventosData } from "../data/EventosData";
import { ResponseBuilder } from "../ResponseBuilder";
import { eventosAPIretorno } from "../types/apiRetornoTipos";
import { filtragemEventos, filtragemEventosStatus } from "../types/entidades";
import { transformarDataEmTimeStamp } from "../utils/utilsTempo";

export class EventosBusiness {
  private eventosData = new EventosData();

  obterTodosEventos = async (
    responseBuilder: ResponseBuilder<eventosAPIretorno>,
  ) => {
    try {
      const eventos = await this.eventosData.buscarTodosEventos();

      if (eventos.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem("Não foi encontrado nemhum evento!");
        responseBuilder.adicionarBody({ eventos: eventos });

        return;
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({ eventos: eventos });

      return;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  obterEventoPorId = async (
    eventoId: number,
    responseBuilder: ResponseBuilder<eventosAPIretorno>,
  ) => {
    try {
      const evento = await this.eventosData.buscarEventosPorId(eventoId);

      if (!evento) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem(
          "Não foi encontrado nemhum evento com esse ID!",
        );
        responseBuilder.adicionarBody({ eventos: [evento] });

        return;
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({ eventos: [evento] });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  obterEventosPorFiltragem = async (
    filtros: filtragemEventos,
    responseBuilder: ResponseBuilder<eventosAPIretorno>,
  ) => {
    try {
      filtros.status = filtros.status?.replaceAll("'", "") || "";
      let tags = [];

      if (filtros.status) {
        switch (filtros.status) {
          case filtragemEventosStatus.Concluido:
            break;
          case filtragemEventosStatus.Em_Andamento:
            break;
          case filtragemEventosStatus.Encerrado:
            break;
          case filtragemEventosStatus.Cancelado:
            break;
          case filtragemEventosStatus.Vazio:
            responseBuilder.adicionarCodigoStatus(
              responseBuilder.STATUS_CODE_BAD_REQUEST,
            );
            responseBuilder.adicionarMensagem(
              "Filtro de status precisa esta entre futuros | em_andamento | encerrado",
            );
            return;
            break;
          default:
            responseBuilder.adicionarCodigoStatus(
              responseBuilder.STATUS_CODE_BAD_REQUEST,
            );
            responseBuilder.adicionarMensagem(
              "Filtro de status precisa esta entre futuros | em_andamento | encerrado",
            );
            return;
            break;
        }
      }

      if (filtros.dias) {
        filtros.dias = transformarDataEmTimeStamp(filtros.dias);
      }

      if (filtros.tags?.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_BAD_REQUEST,
        );
        responseBuilder.adicionarMensagem(
          "Tags não pode ser vazio e não pode conter apenas caracteres especiais",
        );
        return;
      }

      if (filtros.tags && typeof filtros.tags === "string") {
        filtros.tags = filtros.tags
          .split(",")
          .map((e) => e.trim().toLowerCase());
      }

      const filtro = Object.values(filtros).filter((e) => e);
      const eventos = await this.eventosData.buscarEventoPorFiltro(filtro);

      if (eventos.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );
        responseBuilder.adicionarMensagem(
          "Não existe nemhuma evento com esses filtros",
        );
        return;
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({ eventos: eventos });

      return;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
