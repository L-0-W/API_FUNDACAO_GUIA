import { Request, Response } from "express";
import { AdminBusiness } from "../business/AdminBusiness";
import { ResponseBuilder } from "../ResponseBuilder";
import { localizacaoAPIretorno } from "../types/apiRetornoTipos";

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
}
