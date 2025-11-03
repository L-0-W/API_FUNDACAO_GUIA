import { ResponseBuilder } from "../ResponseBuilder";
import { NoticiaisData } from "../data/NoticiasData";
import { LIMIT_WORKER_THREADS } from "sqlite3";

import { noticia_DTO, params_noticia } from "../types/entidades";
import { noticiaAPIretorno } from "../types/apiRetornoTipos";

export class NoticiaisBusiness {
  private noticiasData = new NoticiaisData();

  verificarBuscaNoticias = async (
    params: params_noticia,
    responseBuilder: ResponseBuilder<noticiaAPIretorno>,
  ) => {
    try {
      if (Object.keys(params).length == 0) {
        console.log("Fazendo busca padrão..");

        const retorno: noticia_DTO[] =
          await this.noticiasData.buscarNoticiaDefault();

        if (retorno.length == 0) {
          responseBuilder.adicionarCodigoStatus(
            responseBuilder.STATUS_CODE_VAZIO,
          );
          responseBuilder.adicionarMensagem(
            "Não foi encontrado nemhuma noticia desde os ultimos 30 dias..",
          );
        } else {
          responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
        }
        const noticiaRetorno: noticiaAPIretorno = {
          noticias: retorno,
        };

        responseBuilder.adicionarBody(noticiaRetorno);
        return;
      }

      const retorno = await this.noticiasData.buscarNoticiaFiltrado(params);

      console.log(retorno);
      const novaNoticia: noticiaAPIretorno = {
        noticias: retorno,
      };

      console.log(params);
      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody(novaNoticia);
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
