import { AdminData } from "../data/AdminData";
import { ResponseBuilder } from "../ResponseBuilder";
import { verificarToken } from "../middleware/jwtVerificacao";
import {
  adminAPIretorno,
  localizacaoAPIretorno,
} from "../types/apiRetornoTipos";
import { exame } from "../types/entidades";

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

  executarLogicaCriacaoExame = async (
    responseBuilder: ResponseBuilder<adminAPIretorno<exame>>,
    token: string,
    exame_values: string[],
  ) => {
    try {
      if (exame_values.sucesso)
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
