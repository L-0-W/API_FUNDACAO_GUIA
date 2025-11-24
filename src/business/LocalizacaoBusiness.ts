import { ResponseBuilder } from "../ResponseBuilder";
import { LocalizacaoData } from "../data/LocalizacaoData";
import { bloco, setor, exame, catchErros } from "../types/entidades";
import { localizacaoAPIretorno } from "../types/apiRetornoTipos";

export class LocalizacaoBusiness {
  private localizacaoData = new LocalizacaoData();

  private lidarBuscarExame = async (
    exameFormatado: string,
    responseBuilder: ResponseBuilder<localizacaoAPIretorno>,
  ) => {
    try {
      const exames = await this.localizacaoData.buscarExames(exameFormatado);

      console.log("Business ->", exames);

      if (!exames || exames == undefined) {
        console.log("Business -> Erro, voltando vazio");
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem(
          "Não existe nehum setor/bloco com esse exame!",
        );

        throw new Error(catchErros.CLIENTE);
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

        throw new Error(catchErros.CLIENTE);
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

        throw new Error(catchErros.CLIENTE);
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({
        exames: exames,
        setor: setor,
        bloco: bloco,
      });

      return;
    } catch (err: any) {
      throw new Error(err.message);
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

        throw new Error(catchErros.CLIENTE);
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

        throw new Error(catchErros.CLIENTE);
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

        throw new Error(catchErros.CLIENTE);
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({
        exames: exames,
        setor: setor,
        bloco: bloco,
      });

      return;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  private lidarBuscarBloco = async (
    blocoFormatado: string,
    responseBuilder: ResponseBuilder<localizacaoAPIretorno>,
  ) => {
    try {
      const bloco = await this.localizacaoData.buscarBloco(blocoFormatado);

      console.log("Business -> " + bloco);

      if (!bloco || bloco == undefined) {
        console.log("Business -> Erro, voltando vazio");
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem(
          "Não existe nehum bloco com esse nome!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      const setores: setor[] = await this.localizacaoData.buscarSetoresPorBloco(
        bloco.id,
      );

      if (!setores || setores.length === 0) {
        console.log("Business -> Erro, voltando vazio");
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem(
          "Não foi encontrado nemhum setor para esse bloco!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      let exames: exame[] = [];

      for (let i = 0; i < setores.length; i++) {
        exames.push(
          ...(await this.localizacaoData.buscarExamesPorSetor(
            setores[i]?.id as number,
          )),
        );
      }

      if (!exames || exames.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );

        responseBuilder.adicionarMensagem(
          "Não foi achado nemhum exame para esses setores desse bloco!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({
        exames: exames,
        setor: setores,
        bloco: bloco,
      });

      return;
    } catch (err: any) {
      throw new Error(err.message);
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
      const blocoFormatado = bloco?.toLowerCase().trimStart().trimEnd();

      if (exame != undefined && exameFormatado?.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao formatar parametro 'exame', certifique-se que exame esta preenchido.",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (setor != undefined && setorFormatado?.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao formatar parametro 'setor', certifique-se que setor esta preenchido.",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (bloco != undefined && blocoFormatado?.length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao formatar parametro 'bloco', certifique-se que bloco esta preenchido.",
        );

        throw new Error(catchErros.CLIENTE);
      }

      console.log(
        "Business ->" +
          exameFormatado +
          " " +
          setorFormatado +
          "  " +
          blocoFormatado,
      );

      if (exameFormatado) {
        await this.lidarBuscarExame(exameFormatado, responseBuilder);
      } else if (setorFormatado) {
        await this.lidarBuscarSetor(setorFormatado, responseBuilder);
      } else if (blocoFormatado) {
        console.log(blocoFormatado);
        await this.lidarBuscarBloco(blocoFormatado, responseBuilder);
      }

      return;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
}
