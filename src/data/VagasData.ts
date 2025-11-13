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
    filtros_array: string[],
    recentes?: number,
  ): Promise<vagasEmprego[]> => {
    try {
      const vagas = await connection
        .select("*")
        .from("vagas")
        .where((builder) => {
          filtros_array.forEach((e) => {
            const filtro = e.split(":");

            if (filtro[0] === "cargo") {
              builder.andWhereLike("cargo", `%${filtro[1]}%`);
            }

            if (filtro[0] === "cidade") {
              builder.andWhereLike("cidade", filtro[1]);
            }

            if (filtro[0] === "modalidade") {
              builder.andWhereLike("modalidade", filtro[1]);
            }

            if (filtro[0] === "tipo_vinculo") {
              builder.andWhereLike("tipo_vinculo", filtro[1]);
            }

            if (filtro[0] === "recentes") {
              builder.andWhere(function () {
                this.where("data_publicacao", ">=", Number(filtro[1]));
              });
            }

            if (filtro[0] === "beneficios") {
              builder.andWhere(function () {
                const beneficios = filtro[1]?.split(",");

                beneficios?.forEach((bene) => {
                  this.orWhereLike("beneficios", `%${bene}%`);
                });
              });
            }
          });
        });

      return vagas;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
