import { connection } from "../dbConnection";
import { exame } from "../types/entidades";

export class AdminData {
  buscarLocalPorId = async (id: number): Promise<any> => {
    try {
      const local = await connection
        .select("id")
        .from("local")
        .where("id_incremental", id)
        .first();

      return local;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  deletarExamePorId = async (id: number): Promise<number> => {
    try {
      const exame = await connection
        .select("id")
        .from("exames")
        .where({ id: id })
        .first();

      if (!exame) {
        return 0;
      }

      await connection("exames").where({ id: id }).del();

      return 1;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  criarExame = async (valores: string[]): Promise<exame[]> => {
    try {
      const examesCriados = await connection
        .insert(
          { nome: valores[0], descricao: valores[1], local_id: valores[3] },
          ["*"],
        )
        .into("exames");

      return examesCriados;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
