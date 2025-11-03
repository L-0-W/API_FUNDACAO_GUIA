import { Request, Response } from "express";
import { AdminBusiness } from "../business/AdminBusiness";
import { ResponseBuilder } from "../ResponseBuilder";
import { localizacaoAPIretorno } from "../types/apiRetornoTipos";

export class AdminController {
  private adminBusiness = new AdminBusiness();
  private responseBuilder = new ResponseBuilder<localizacaoAPIretorno>();

  deletarExamePorId = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const jwt_auth = req.headers.authorization;

      if (isNaN(id) || !Number.isInteger(id)) {
        this.responseBuilder.adicionarCodigoStatus(
          this.responseBuilder.STATUS_CODE_BAD_REQUEST,
        );

        this.responseBuilder.adicionarMensagem("Id esta incorreto..");
        this.responseBuilder.build(res);

        return;
      }

      if (!jwt_auth) {
        this.responseBuilder.adicionarCodigoStatus(
          this.responseBuilder.STATUS_CODE_BAD_REQUEST,
        );

        this.responseBuilder.adicionarMensagem("Token necessario não existe");
        this.responseBuilder.build(res);

        return;
      }

      await this.adminBusiness.deletarExamePorId(
        id,
        jwt_auth,
        this.responseBuilder,
      );

      this.responseBuilder.build(res);
    } catch (err: any) {
      this.responseBuilder.adicionarCodigoStatus(
        this.responseBuilder.STATUS_CODE_SERVER_ERROR,
      );
      this.responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

      this.responseBuilder.build(res);
    }
  };
}
