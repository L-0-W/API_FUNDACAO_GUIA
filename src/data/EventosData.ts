import { get } from "node:https";
import { connection } from "../dbConnection";
import { filtragemEventos, filtragemEventosStatus } from "../types/entidades";
import { evento } from "../types/entidades";

export class EventosData {
  buscarTodosEventos = async (): Promise<evento[]> => {
    try {
      const eventos = await connection("eventos").select("*");
      return eventos;
    } catch (err: any) {
      throw new Error(err);
    }
  };
  buscarEventosPorId = async (eventoId: number): Promise<evento> => {
    try {
      const evento = await connection
        .select("*")
        .from("eventos")
        .where("id", eventoId)
        .first();

      return evento;
    } catch (err: any) {
      throw new Error(err);
    }
  };
  buscarEventoPorFiltro = async (filtros: string[]): Promise<evento[]> => {
    try {
      const dataAtual = Date.now();

      const evento = await connection
        .select("*")
        .from("eventos")
        .where((builder) => {
          filtros.forEach((e) => {
            typeof e === "number"
              ? builder
                  .andWhere("data_inicio", "<=", e)
                  .andWhere("data_fim", ">=", dataAtual)
              : undefined;
            typeof e === "string"
              ? builder.andWhere("status", "LIKE", e)
              : undefined;
            typeof e === "object"
              ? builder.andWhere((builder2) => {
                  const tag = e as string[];

                  tag.forEach((el) => {
                    console.log(el);
                    builder2
                      .orWhereLike("titulo", `%${el}%`)
                      .orWhereLike("descricao", `%${el}%`)
                      .orWhereLike("publico_alvo", `%${el}%`);
                  });
                })
              : undefined;
          });
        });

      return evento;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
