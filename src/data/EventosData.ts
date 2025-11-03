import { connection } from "../dbConnection";
import { evento } from "../types/entidades";

export class EventosData {
  buscarTodosEventos = (): Promise<evento[]> => {
    try {
      const eventos = connection("eventos").select("*");
      return eventos;
    } catch (err: any) {
      throw new Error(err);
    }
  };
  buscarEventosPorId = (eventoId: number): Promise<evento> => {
    try {
      const evento = connection
        .select("*")
        .from("eventos")
        .where("id", eventoId)
        .first();

      return evento;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
