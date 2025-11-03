import { ResponseBuilder } from "../ResponseBuilder";
import { LocalizacaoData } from "../data/LocalizacaoData";
import { bloco, setor, exame } from "../types/entidades";
import { localizacaoAPIretorno } from "../types/apiRetornoTipos";

export class LocalizacaoBusiness {
  private localizacaoData = new LocalizacaoData();

  private lidarBuscarExame = async (
    exameFormatado: string,
    responseBuilder: ResponseBuilder<localizacaoAPIretorno>,
  ) => {
    try {
      const exames = await this.localizacaoData.buscarExames(exameFormatado);

      console.log("Business -> " + exames);

      if (!exames || exames == undefined) {
        console.log("Business -> Erro, voltando vazio");
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
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({
        exames: exames,
        setor: setor,
        bloco: bloco,
      });

      return;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  private lidarBuscarSetor = async (
    setorFormatado: string,
    responseBuilder: ResponseBuilder<localizacaoAPIretorno>,
  ) => {
    try {
      const setor = await this.localizacaoData.buscarSetor(setorFormatado);

      console.log("Business -> " + setor);

      if (!setor || setor == undefined) {
        console.log("Business -> Erro, voltando vazio");
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem(
          "Não existe nehum setor com esse nome!",
        );

        return;
      }

      const exames: exame[] = await this.localizacaoData.buscarExamesPorSetor(
        setor.id,
      );

      if (!exames) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );

        responseBuilder.adicionarMensagem(
          "Não foi achado nemhum exames para esse setor!",
        );

        return;
      }

      console.log(setor.bloco_id);
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
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({
        exames: exames,
        setor: setor,
        bloco: bloco,
      });

      return;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  obterLocalizacaoPorParametros = async (
    responseBuilder: ResponseBuilder<localizacaoAPIretorno>,
    exame?: string,
    setor?: string,
    bloco?: string,
  ) => {
    try {
      const exameFormatado = exame?.toLowerCase().trimStart().trimEnd();
      const setorFormatado = setor?.toLowerCase().trimStart().trimEnd();

      if (exame != undefined && exameFormatado?.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao formatar parametro 'exame', certifique-se que exame esta preenchido.",
        );

        return;
      }

      if (setor != undefined && setorFormatado?.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao formatar parametro 'setor', certifique-se que exame esta preenchido.",
        );

        return;
      }

      console.log("Business ->" + exameFormatado + " " + setorFormatado);

      if (exameFormatado) {
        await this.lidarBuscarExame(exameFormatado, responseBuilder);
        return;
      } else if (setorFormatado) {
        await this.lidarBuscarSetor(setorFormatado, responseBuilder);
        return;
      }

      return;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
