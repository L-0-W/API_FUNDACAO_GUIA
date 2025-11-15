import { LoginData } from "../data/LoginData";
import { ResponseBuilder } from "../ResponseBuilder";
import { admin, catchErros } from "../types/entidades";

import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { localizacaoAPIretorno } from "../types/apiRetornoTipos";

export class LoginBusiness {
  private loginData = new LoginData();

  private verificarHashComSenha = async (
    hash: string,
    senha: string,
  ): Promise<boolean> => {
    try {
      return await argon2.verify(hash, senha);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  verificarLoginParametros = async (
    responseBuilder: ResponseBuilder<localizacaoAPIretorno>,
    email: string,
    senha: string,
  ) => {
    try {
      const admin_retorno = await this.loginData.procurarAdminPorNome(email);

      if (!admin_retorno || admin_retorno[0] == undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem(`A senha ou email esta incorreto...`);

        throw new Error(catchErros.CLIENTE);
      }

      console.log("User existe");

      const eValido = await this.verificarHashComSenha(
        admin_retorno[0].senha,
        senha,
      );

      if (!eValido) {
        console.log("Usuario existe, mas senha esta incorreta");
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_NAO_AUTORIZADO,
        );

        responseBuilder.adicionarMensagem(`A senha ou email esta incorreto...`);

        throw new Error(catchErros.CLIENTE);
      }

      const token = jwt.sign(
        { adminID: admin_retorno[0].id, adminEmail: admin_retorno[0].email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" },
      );

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarMensagem(`Token Gerado: ${token}`);

      return;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
