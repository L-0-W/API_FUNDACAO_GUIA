import { NoticiaisBusiness } from "../business/NoticiasBusiness";
import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { noticiaAPIretorno } from "../types/apiRetornoTipos";
import { params_noticia } from "../types/entidades";

export class NoticiaisController {
  private noticiasBusiness = new NoticiaisBusiness();

  buscarNoticias = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<noticiaAPIretorno>();

    try {
      const { bloco, setor, exame, tags } = req.query;

      const recentes = Number(req.query.recentes);

      if (recentes && !Number.isInteger(recentes)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );

        responseBuilder.adicionarMensagem(
          "Foi coloado um valor incorreto no parametro 'recentes'..",
        );

        responseBuilder.construir(res);

        return;
      }

      if ((tags && tags.toString().split(","), length === 0)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Ao filtrar por tags, e obrigatorio que coloque os valores nesse formato: tags=valor1,valor2",
        );
        responseBuilder.construir(res);
      }
      const params: params_noticia = {};

      console.log(setor);

      recentes ? (params.recentes = recentes as number) : undefined;
      bloco ? (params.bloco = bloco as string) : undefined;
      setor ? (params.setor = setor as string) : undefined;
      exame ? (params.exame = exame as string) : undefined;
      tags ? (params.tags = tags as string) : undefined;

      await this.noticiasBusiness.verificarBuscaNoticias(
        params,
        responseBuilder,
      );

      responseBuilder.construir(res);
      return;
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );

      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
      responseBuilder.construir(res);
    }
  };
}
