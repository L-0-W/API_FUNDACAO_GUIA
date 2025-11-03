import { EventosData } from "../data/EventosData";
import { ResponseBuilder } from "../ResponseBuilder";
import { eventosAPIretorno } from "../types/apiRetornoTipos";

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
}
