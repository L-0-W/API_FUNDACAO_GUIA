import { Request, Response } from "express";
import { LoginBusiness } from "../business/LoginBusiness";
import { ResponseBuilder } from "../ResponseBuilder";
import { localizacaoAPIretorno } from "../types/apiRetornoTipos";

export class LoginController {
  private loginBusiness = new LoginBusiness();

  fazerLogin = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<localizacaoAPIretorno>();

    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        const msg_err = `Senha ou Nome do admin esta faltando ou incorreto para fazer login`;
        responseBuilder.adicionarMensagem(msg_err);
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.construir(res);

        return;
      }

      if (email.trim().length <= 0 || senha.trim().length <= 0) {
        const msg_err = `Senha ou Nome do admin esta vazio ou com apenas espaços`;
        responseBuilder.adicionarMensagem(msg_err);
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.construir(res);

        return;
      }

      await this.loginBusiness.verificarLoginParametros(
        responseBuilder,
        email,
        senha,
      );

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
