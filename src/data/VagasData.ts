import { connection } from "../dbConnection";
import { filtrosVaga, vagasEmprego } from "../types/entidades";

export class VagasData {
  buscarTodasVagas = async (): Promise<vagasEmprego[]> => {
    try {
      const vagas: vagasEmprego[] = await connection("vagas").select("*");
      return vagas;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  buscarVagaPorId = async (vagaId: number): Promise<vagasEmprego> => {
    try {
      const vaga: vagasEmprego = await connection
        .select("*")
        .from("vagas")
        .where("id", vagaId)
        .first();

      return vaga;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  buscarVagaPorFiltro = async (
    filtros: filtrosVaga,
  ): Promise<vagasEmprego[]> => {
    try {
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
