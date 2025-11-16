import { get } from "node:https";
import { connection } from "../dbConnection";
import {
  catchErros,
  filtragemEventos,
  filtragemEventosStatus,
} from "../types/entidades";
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

      const eventos = await connection
        .select("*")
        .from("eventos")
        .where((builder) => {
          filtros.forEach((filtroElemento) => {
            if (typeof filtroElemento === "number") {
              const dataLimite = filtroElemento;

              builder
                .andWhere("data_inicio", "<=", dataLimite)
                .andWhere("data_fim", ">=", dataAtual);
              return;
            }

            if (typeof filtroElemento === "string") {
              const status = filtroElemento;

              builder.andWhere("status", "LIKE", status);
              return;
            }

            if (typeof filtroElemento === "object") {
              const termosBusca = filtroElemento as string[];

              builder.andWhere((builder2) => {
                termosBusca.forEach((termo) => {
                  console.log(termo);

                  builder2
                    .orWhereLike("titulo", `%${termo}%`)
                    .orWhereLike("descricao", `%${termo}%`)
                    .orWhereLike("publico_alvo", `%${termo}%`);
                });
              });
              return;
            }
          });
        });
      return eventos;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
