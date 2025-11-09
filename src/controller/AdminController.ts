import { Request, Response } from "express";
import { AdminBusiness } from "../business/AdminBusiness";
import { ResponseBuilder } from "../ResponseBuilder";
import { localizacaoAPIretorno } from "../types/apiRetornoTipos";
import { verificarToken } from "../middleware/jwtVerificacao";

export class AdminController {
  private adminBusiness = new AdminBusiness();

  deletarExamePorId = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<localizacaoAPIretorno>();

    try {
      const id = Number(req.params.id);
      const jwt_auth = req.headers.authorization;

      if (isNaN(id) || !Number.isInteger(id)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Id esta incorreto..");
        responseBuilder.construir(res);

        return;
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Token necessario não existe");
        responseBuilder.construir(res);

        return;
      }

      const tokenFormatado = jwt_auth.split("Bearer ")[1];

      if (tokenFormatado == undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );

        responseBuilder.adicionarMensagem("Erro ao tentar formatar token...");
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

        return;
      }

      await this.adminBusiness.deletarExamePorId(id, jwt_auth, responseBuilder);

      responseBuilder.construir(res);
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );
      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

      responseBuilder.construir(res);
    }
  };

  criarExame = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<localizacaoAPIretorno>();

    try {
      const { nome, descricao, local_id } = req.body;

      if (!nome || !descricao || !local_id) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, todos os parametros: 'nome', 'descricao', 'local_id' são obrigatorios!",
        );
        responseBuilder.construir(res);
        return;
      }

      await this.adminBusiness.executarLogicaCriacaoExame(responseBuilder, {
        nome,
        descricao,
        local_id,
      });
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );
      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

      responseBuilder.construir(res);
    }
  };
}
