import { AdminData } from "../data/AdminData";
import { ResponseBuilder } from "../ResponseBuilder";
import { verificarToken } from "../middleware/jwtVerificacao";
import {
  adminAPIretorno,
  localizacaoAPIretorno,
} from "../types/apiRetornoTipos";
import { exame } from "../types/entidades";
import { X509Certificate } from "node:crypto";
import e from "cors";
import { describe } from "node:test";

export class AdminBusiness {
  private adminData = new AdminData();

  deletarExamePorId = async (
    id: number,
    token: string,
    responseBuilder: ResponseBuilder<adminAPIretorno<exame>>,
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado == undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );

        responseBuilder.adicionarMensagem("Erro ao tentar formatar token...");
        responseBuilder.adicionarBody({ sucesso: false });

        return;
      }

      const eValido = verificarToken(tokenFormatado);

      console.log(eValido);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_NAO_AUTORIZADO,
        );

        responseBuilder.adicionarMensagem(
          "O token recebido esta expirado ou não e valido...",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const resultado = await this.adminData.deletarExamePorId(id);

      if (resultado == 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem("Exame não econtrado...");
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarMensagem("Exame deletado com sucesso");
      responseBuilder.adicionarBody({ sucesso: true, total: 1 });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  deletarVagasPorId = async (
    id: number,
    token: string,
    responseBuilder: ResponseBuilder<adminAPIretorno<exame>>,
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado == undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );

        responseBuilder.adicionarMensagem("Erro ao tentar formatar token...");
        responseBuilder.adicionarBody({ sucesso: false });

        return;
      }

      const eValido = verificarToken(tokenFormatado);

      console.log(eValido);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_NAO_AUTORIZADO,
        );

        responseBuilder.adicionarMensagem(
          "O token recebido esta expirado ou não e valido...",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const resultado = await this.adminData.deletarVagaPorId(id);

      if (resultado == 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem("Vaga não econtrado...");
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarMensagem("Vaga deletado com sucesso");
      responseBuilder.adicionarBody({ sucesso: true, total: 1 });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  executarLogicaCriacaoExame = async (
    responseBuilder: ResponseBuilder<adminAPIretorno<exame>>,
    token: string,
    exame_values: string[],
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado === undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, algo de errado esta no seu header de autorização",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const eValido = verificarToken(tokenFormatado);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, TOKEN incorreto ou expirado!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      exame_values.forEach((e) => {
        if (e.trim().length === 0) {
          responseBuilder.adicionarCodigoStatus(
            responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
          );

          responseBuilder.adicionarMensagem(
            "Parametros não pode incluir apenas espaços, e necessario algum valor",
          );

          responseBuilder.adicionarBody({ sucesso: false });
          return;
        }
      });

      const id = Number(exame_values[3]);

      if (!Number.isInteger(id)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao tentar transformar 'local_id' em numero, verifique se e um numero inteiro e se existe!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const localExiste = await this.adminData.buscarLocalPorId(id);

      if (!localExiste) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao tentar encontrar local usando 'local_id', verifique se esse local existe!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const examesCriados = await this.adminData.criarExame(exame_values);

      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_OK_CRIADO,
      );
      responseBuilder.adicionarBody({
        sucesso: true,
        total: 1,
        data: examesCriados,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  executarLogicaPatchExame = async (
    responseBuilder: ResponseBuilder<adminAPIretorno<exame>>,
    token: string,
    exame_values: string[],
    id_exame: number,
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado === undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, algo de errado esta no seu header de autorização",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const eValido = verificarToken(tokenFormatado);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, TOKEN incorreto ou expirado!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      exame_values.forEach((e) => {
        if (e.trim().length === 0) {
          responseBuilder.adicionarCodigoStatus(
            responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
          );

          responseBuilder.adicionarMensagem(
            "Parametros não pode incluir apenas espaços, e necessario algum valor",
          );

          responseBuilder.adicionarBody({ sucesso: false });
          return;
        }
      });

      const id = Number(exame_values[3]);

      if (!Number.isInteger(id)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao tentar transformar 'local_id' em numero, verifique se e um numero inteiro e se existe!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const exameExiste = await this.adminData.buscarLocalPorId(id);

      if (!exameExiste) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao tentar encontrar exame usando 'id' fornecido, verifique se esse exame existe!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const examePatch = await this.adminData.patchExame(id, exame_values);

      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_OK_CRIADO,
      );
      responseBuilder.adicionarBody({
        sucesso: true,
        total: 1,
        data: examePatch,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
