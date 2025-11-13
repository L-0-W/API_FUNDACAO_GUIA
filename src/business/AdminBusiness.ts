import { AdminData } from "../data/AdminData";
import { ResponseBuilder } from "../ResponseBuilder";

import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { LIMIT_WORKER_THREADS } from "sqlite3";
import { application } from "express";
import { localizacaoAPIretorno } from "../types/apiRetornoTipos";
import { catchErros } from "../types/entidades";

export class AdminBusiness {
  private adminData = new AdminData();

  private verificarToken = (token: string) => {
    let eValido = false;
    const jwt_check_retorno = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, req: any) => {
        if (err) return (eValido = false);
        return (eValido = true);
      },
    );

    return eValido;
  };

  deletarExamePorId = async (
    id: number,
    token: string,
    responseBuilder: ResponseBuilder<localizacaoAPIretorno>,
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado == undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );

        responseBuilder.adicionarMensagem("Erro ao tentar formatar token...");

        throw new Error(catchErros.CLIENTE);
      }

      const eValido = this.verificarToken(tokenFormatado);

      console.log(eValido);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_NAO_AUTORIZADO,
        );

        responseBuilder.adicionarMensagem(
          "O token recebido esta expirado ou não e valido...",
        );

        throw new Error(catchErros.CLIENTE);
      }

      const resultado = await this.adminData.deletarExamePorId(id);

      if (resultado == 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem("Exame não econtrado...");

        throw new Error(catchErros.CLIENTE);
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarMensagem("Exame deletado com sucesso");
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
