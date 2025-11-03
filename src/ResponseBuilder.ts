import { Response } from "express";
import { apiRetorno } from "./types/apiRetornoTipos";
import { exame } from "./types/entidades";

export class ResponseBuilder<T> {
  public readonly STATUS_CODE_OK: number = 200;
  public readonly STATUS_CODE_VAZIO: number = 404;
  public readonly STATUS_CODE_ERRO_USUARIO: number = 400;
  public readonly STATUS_CODE_SERVER_ERROR: number = 500;
  public readonly STATUS_CODE_NAO_AUTORIZADO: number = 401;
  public readonly STATUS_CODE_ERRO_SEMANTICO: number = 422;

  private retorno: apiRetorno<T> = {};

  public adicionarCodigoStatus(status: number) {
    this.retorno.codigoStatus = status;
    return;
  }

  public adicionarBody(body: T) {
    this.retorno.body = body;
    return;
  }

  public adicionarMensagem(msg: string) {
    this.retorno.mensagem = msg;
    return;
  }

  public construir(res: Response) {
    // ver o tamanho da array de exames/noticias para preencher total.
    res.status(this.retorno.codigoStatus || 500).json(this.retorno);
  }
}
