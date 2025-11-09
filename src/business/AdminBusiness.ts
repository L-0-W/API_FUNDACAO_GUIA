import { AdminData } from "../data/AdminData";
import { ResponseBuilder } from "../ResponseBuilder";

import { localizacaoAPIretorno } from "../types/apiRetornoTipos";

export class AdminBusiness {
  private adminData = new AdminData();

  deletarExamePorId = async (
    id: number,
    token: string,
    responseBuilder: ResponseBuilder<localizacaoAPIretorno>,
  ) => {
    try {
      const resultado = await this.adminData.deletarExamePorId(id);

      if (resultado == 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem("Exame não econtrado...");
        return;
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarMensagem("Exame deletado com sucesso");
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
