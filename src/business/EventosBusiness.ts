import { toUnicode } from "node:punycode";
import { EventosData } from "../data/EventosData";
import { ResponseBuilder } from "../ResponseBuilder";
import { eventosAPIretorno } from "../types/apiRetornoTipos";
import {
  catchErros,
  filtragemEventos,
  filtragemEventosStatus,
} from "../types/entidades";
import { criarDataNoFuturo } from "../utils/utilsTempo";

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

        throw new Error(catchErros.CLIENTE);
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({ eventos: eventos });

      return;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  obterEventoPorId = async (
    eventoId: number,
    responseBuilder: ResponseBuilder<eventosAPIretorno>,
  ) => {
    try {
      const evento = await this.eventosData.buscarEventosPorId(eventoId);

      console.log("FOI 1");
      if (!evento) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem(
          "Não foi encontrado nemhum evento com esse ID!",
        );
        responseBuilder.adicionarBody({ eventos: [evento] });

        throw new Error(catchErros.CLIENTE);
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({ eventos: [evento] });
    } catch (err: any) {
      console.log(err.message);
      throw new Error(err.message);
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
              responseBuilder.STATUS_CODE_ERRO_USUARIO,
            );
            responseBuilder.adicionarMensagem(
              "Filtro de status precisa esta entre futuros | em_andamento | encerrado",
            );
            throw new Error(catchErros.CLIENTE);
            break;
          default:
            responseBuilder.adicionarCodigoStatus(
              responseBuilder.STATUS_CODE_ERRO_USUARIO,
            );
            responseBuilder.adicionarMensagem(
              "Filtro de status precisa esta entre futuros | em_andamento | encerrado",
            );
            throw new Error(catchErros.CLIENTE);
            break;
        }
      }

      if (filtros.dias) {
        filtros.dias = criarDataNoFuturo(filtros.dias);
      }

      if (filtros.tags?.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Tags não pode ser vazio e não pode conter apenas caracteres especiais",
        );
        throw new Error(catchErros.CLIENTE);
      }

      if (filtros.tags && typeof filtros.tags === "string") {
        filtros.tags = filtros.tags
          .split(",")
          .map((e) => e.trim().toLowerCase());
      }

      const filtro = Object.values(filtros).filter((e) => e) as string[];
      const eventos = await this.eventosData.buscarEventoPorFiltro(filtro);

      if (eventos.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );
        responseBuilder.adicionarMensagem(
          "Não existe nemhuma evento com esses filtros",
        );
        throw new Error(catchErros.CLIENTE);
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({ eventos: eventos });
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
