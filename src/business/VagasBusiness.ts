import { VagasData } from "../data/VagasData";
import { ResponseBuilder } from "../ResponseBuilder";
import { vagasAPIretorno } from "../types/apiRetornoTipos";
import { filtrosVaga, vagasVinculo } from "../types/entidades";

export class VagasBusiness {
  private vagasData = new VagasData();

  obterTodasAsVagas = async (
    responseBuilder: ResponseBuilder<vagasAPIretorno>,
  ) => {
    try {
      const vagas = await this.vagasData.buscarTodasVagas();

      if (!vagas || vagas.length == 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );
        responseBuilder.adicionarMensagem(
          "Não existe nemhuma vaga de emprego disponivel!",
        );

        responseBuilder.adicionarBody({ vagas: vagas });
        return;
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({ vagas: vagas });
      return;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  obterVagaPorId = async (
    vagaId: number,
    responseBuilder: ResponseBuilder<vagasAPIretorno>,
  ) => {
    try {
      const vaga = await this.vagasData.buscarVagaPorId(vagaId);

      if (!vaga) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );
        responseBuilder.adicionarMensagem(
          "Não existe nemhuma vaga de emprego disponivel!",
        );

        responseBuilder.adicionarBody({ vagas: vaga });
        return;
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({ vagas: [vaga] });

      return;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  obterVagaPorFiltro = async (
    filtros: filtrosVaga,
    responseBuilder: ResponseBuilder<vagasAPIretorno>,
  ) => {
    try {
      if (filtros.tipo_vinculo) {
        switch (filtros.tipo_vinculo) {
          case "CLT":
            break;
          case "ESTAGIO":
            break;
          case "PJ":
            break;
          default:
            responseBuilder.adicionarCodigoStatus(
              responseBuilder.STATUS_CODE_ERRO_USUARIO,
            );

            responseBuilder.adicionarMensagem(
              "Tipo Vinculo preicsar ser 'CLT' | 'PJ' ou 'ESTAGIO' ",
            );

            return;
        }
      }

      const filtros_array = Object.entries(filtros).map((e) => {
        return e[0] + ":" + e[1];
      });

      console.log(filtros_array);

      const vagas = await this.vagasData.buscarVagaPorFiltro(filtros_array);

      if (!vagas || vagas.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );
        responseBuilder.adicionarMensagem(
          "Nemhuma vaga foi encontrado com esses filtros!",
        );

        responseBuilder.adicionarBody({ vagas: vagas });

        return;
      }

      return;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
