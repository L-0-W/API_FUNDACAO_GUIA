import { Request, Response } from "express";
import { AdminBusiness } from "../business/AdminBusiness";
import { ResponseBuilder } from "../ResponseBuilder";
import {
  adminAPIretorno,
  localizacaoAPIretorno,
} from "../types/apiRetornoTipos";
import { exame } from "../types/entidades";

export class AdminController {
  private adminBusiness = new AdminBusiness();

  deletarExamePorId = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<exame>>();

    try {
      const id = Number(req.params.id);
      const jwt_auth = req.headers.authorization;

      if (isNaN(id) || !Number.isInteger(id)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Id esta incorreto..");
        responseBuilder.adicionarBody({ sucesso: false });

        responseBuilder.construir(res);

        return;
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Token necessario não existe");
        responseBuilder.adicionarBody({ sucesso: false });

        responseBuilder.construir(res);

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
    const responseBuilder = new ResponseBuilder<adminAPIretorno<exame>>();

    try {
      const { nome, descricao, local_id } = req.body;
      const jwt_auth = req.headers.authorization;

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

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        responseBuilder.construir(res);
        return;
      }

      await this.adminBusiness.executarLogicaCriacaoExame(
        responseBuilder,
        jwt_auth,
        [nome, descricao, local_id],
      );
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );
      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

      responseBuilder.construir(res);
    }
  };
}
