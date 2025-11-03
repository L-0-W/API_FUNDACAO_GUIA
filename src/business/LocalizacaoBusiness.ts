import { ResponseBuilder } from "../ResponseBuilder";
import { LocalizacaoData } from "../data/LocalizacaoData";
import { bloco, setor } from "../types/tiposComuns";
import { localizacaoAPIretorno } from "../types/tiposRetorno";

export class LocalizacaoBusiness {
  private localizacaoData = new LocalizacaoData();

  obterLocalizacaoPorParametros = async (
    exame: string,
    responseBuilder: ResponseBuilder<localizacaoAPIretorno>,
  ) => {
    try {
      const exameFormatado = exame.toLowerCase().trimStart().trimEnd();

      if (!exameFormatado || exameFormatado.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao formatar parametro 'exame', certifique-se que exame esta preenchido.",
        );

        return;
      }

      const exames = await this.localizacaoData.buscarExames(exameFormatado);

      if (!exames) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem(
          "Não existe nehum setor/bloco com esse exame!",
        );

        return;
      }

      const setor: setor = await this.localizacaoData.buscarSetorPorId(
        exames.local_id,
      );

      if (!setor) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );

        responseBuilder.adicionarMensagem(
          "Erro ao tentar relacionar exame com setor..",
        );

        return;
      }

      const bloco: bloco = await this.localizacaoData.buscarBlocoPorId(
        setor.bloco_id,
      );

      if (!bloco) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );

        responseBuilder.adicionarMensagem(
          "Erro ao tentar relacionar setor com bloco..",
        );

        return;
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({
        exames: [exames],
        setor: [setor],
        bloco: [bloco],
      });

      return;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
