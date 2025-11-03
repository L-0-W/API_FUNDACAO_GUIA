import { NoticiaisBusiness } from "../business/NoticiasBusiness";
import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { noticiaAPIretorno } from "../types/apiRetornoTipos";
import { params_noticia } from "../types/entidades";

export class NoticiaisController {
  private noticiasBusiness = new NoticiaisBusiness();
  private responseBuilder = new ResponseBuilder<noticiaAPIretorno>();

  buscarNoticias = async (req: Request, res: Response) => {
    try {
      const { bloco, setor, exame } = req.query;
      const recentes = Number(req.query.recentes);

      if (recentes && !Number.isInteger(recentes)) {
        this.responseBuilder.adicionarCodigoStatus(
          this.responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );

        this.responseBuilder.adicionarMensagem(
          "Foi coloado um valor incorreto no parametro 'recentes'..",
        );

        this.responseBuilder.construir(res);

        return;
      }

      const params: params_noticia = {};

      console.log(setor);

      recentes ? (params.recentes = recentes as number) : undefined;
      bloco ? (params.bloco = bloco as string) : undefined;
      setor ? (params.setor = setor as string) : undefined;
      exame ? (params.exame = exame as string) : undefined;

      await this.noticiasBusiness.verificarBuscaNoticias(
        params,
        this.responseBuilder,
      );

      this.responseBuilder.construir(res);
      return;
    } catch (err: any) {
      this.responseBuilder.adicionarCodigoStatus(
        this.responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      this.responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
      this.responseBuilder.construir(res);
    }
  };
}
