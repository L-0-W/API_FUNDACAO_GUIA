import { VagasData } from "../data/VagasData";
import { ResponseBuilder } from "../ResponseBuilder";
import { vagasAPIretorno } from "../types/apiRetornoTipos";
import { filtrosVaga } from "../types/entidades";

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
      const filtros_array = Object.entries(filtros).map((e) => {
        return e[0] + ":" + e[1];
      });

      console.log(filtros_array);

      await this.vagasData.buscarVagaPorFiltro(filtros_array);
      return;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
