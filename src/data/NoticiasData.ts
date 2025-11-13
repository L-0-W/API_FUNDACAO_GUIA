import { connection } from "../dbConnection";
import { noticia_DTO, params_noticia } from "../types/entidades";

export class NoticiaisData {
  buscarNoticiaDefault = async (): Promise<noticia_DTO[]> => {
    try {
      const trinta_dias = 2 * 24 * 60 * 60;
      return await connection
        .select("*")
        .from("noticias")
        .whereRaw("data_publicacao >= strftime('%s', 'now') - ?", [
          trinta_dias,
        ]);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  buscarNoticiaFiltrado = async (params: params_noticia) => {
    try {
      const setor = `%${params.setor?.trimStart().trimEnd()}%`;
      const bloco = `%${params.bloco?.trimStart().trimEnd()}%`;
      const exame = `%${params.exame?.trimStart().trimEnd()}%`;

      const dias = params.recentes ? params.recentes * 24 * 60 * 60 : 0;
      return await connection
        .select("*")
        .from("noticias")
        .where(function () {
          params.bloco
            ? this.andWhereRaw("conteudo like UPPER(?)", [bloco])
            : undefined;
          params.exame
            ? this.andWhereRaw("conteudo like UPPER(?)", [exame])
            : undefined;
          params.setor
            ? this.andWhereRaw("conteudo LIKE UPPER(?)", [setor])
            : undefined;
          params.recentes
            ? this.andWhereRaw("data_publicacao >= strftime('%s', 'now') - ?", [
                dias,
              ])
            : undefined;
          this.andWhere(function () {
            const tags = params.tags?.toString().split(",");

            tags?.forEach((tag) => {
              this.orWhereLike("tags", `%${tag}%`);
            });
          });
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
