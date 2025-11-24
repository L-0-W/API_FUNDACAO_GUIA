import { connection } from "../dbConnection";
import { evento, exame, noticia, vagasEmprego } from "../types/entidades";

export class AdminData {
  buscarLocalPorId = async (id: string): Promise<any> => {
    try {
      console.log(id);
      const local = await connection
        .select("id")
        .from("local")
        .where("id", id)
        .first();

      console.log(local);
      return local;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  buscarExamePorId = async (id: string): Promise<any> => {
    try {
      const exame = await connection
        .select("id")
        .from("exames")
        .where("id", id)
        .first();

      console.log(exame);
      return exame;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  buscarNoticiaPorId = async (id: string): Promise<any> => {
    try {
      const noticia = await connection
        .select("id")
        .from("noticias")
        .where({ id })
        .first();

      return noticia;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  buscarEventoPorId = async (id: string): Promise<any> => {
    try {
      const eventos = await connection
        .select("id")
        .from("eventos")
        .where({ id })
        .first();

      return eventos;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  buscarVagaPorId = async (id: string): Promise<any> => {
    try {
      const vaga = await connection
        .select("id")
        .from("vagas")
        .where({ id })
        .first();

      return vaga;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  criarEvento = async (valores: any[], id: string): Promise<evento[]> => {
    try {
      const [eventoCriado] = await connection("eventos").insert(
        {
          id,
          titulo: valores[0],
          descricao: valores[1],
          data_inicio: valores[2],
          data_fim: valores[3],
          status: valores[4],
          publico_alvo: valores[5],
          quantidade: valores[6],
        },
        ["*"],
      );
      return [eventoCriado];
    } catch (err: any) {
      throw new Error(err);
    }
  };

  deletarExamePorId = async (id: string): Promise<exame> => {
    try {
      const exame = await connection
        .select("*")
        .from("exames")
        .where({ id })
        .first();

      if (!exame) {
        return exame;
      }

      await connection("exames").where({ id }).del();

      return exame;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  deletarEventoPorId = async (id: string): Promise<evento> => {
    try {
      const eventos = await connection
        .select("*")
        .from("eventos")
        .where({ id })
        .first();

      if (!eventos) {
        return eventos;
      }

      await connection("eventos").where({ id }).del();

      return eventos;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  deletarNoticiaPorId = async (id: string): Promise<noticia> => {
    try {
      const noticia = await connection
        .select("*")
        .from("noticias")
        .where({ id })
        .first();

      if (!noticia) {
        return noticia;
      }

      await connection("noticias").where({ id }).del();

      return noticia;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  deletarVagaPorId = async (id: string): Promise<vagasEmprego> => {
    try {
      const vaga = await connection
        .select("*")
        .from("vagas")
        .where({ id })
        .first();

      if (!vaga) {
        return vaga;
      }

      await connection("vagas").where({ id }).del();

      return vaga;
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

  criarNoticia = async (valores: any[], id: string): Promise<noticia[]> => {
    try {
      const noticiasCriadas = await connection
        .insert(
          {
            id,
            noticia_id_fundacao: valores[0],
            titulo: valores[1],
            resumo: valores[2],
            conteudo: valores[3],
            data_publicacao: valores[4],
            tags: valores[5],
            imagens: valores[6],
            outros_links: valores[7],
          },
          ["*"],
        )
        .into("noticias");

      return noticiasCriadas;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  criarVaga = async (valores: any[], uuid: string): Promise<vagasEmprego[]> => {
    try {
      const vagaCriada = await connection
        .insert(
          {
            id: uuid,
            cargo: valores[0],
            modalidade: valores[1],
            cidade: valores[2],
            horas: valores[3],
            principais_atividades: valores[4],
            beneficios: valores[5],
            requisitos: valores[6],
            data_publicacao: valores[7],
            como_se_inscrever: valores[8],
            tipo_vinculo: valores[9],
            quantidade: valores[10],
          },
          ["*"],
        )
        .into("vagas");

      return vagaCriada;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  patchExame = async (id: string, valores: string[]): Promise<exame[]> => {
    try {
      const examesCriados = await connection("exames")
        .where("id", id)
        .update(
          { nome: valores[0], descricao: valores[1], local_id: valores[3] },
          ["*"],
        );

      return examesCriados;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  patchNoticia = async (id: string, valores: any[]): Promise<noticia[]> => {
    try {
      const noticiaAtualizada = await connection("noticias")
        .where({ id })
        .update(
          {
            noticia_id_fundacao: valores[0],
            titulo: valores[1],
            resumo: valores[2],
            conteudo: valores[3],
            data_publicacao: valores[4],
            tags: valores[5],
            imagens: valores[6],
            outros_links: valores[7],
          },
          ["*"],
        );

      return noticiaAtualizada;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  patchVaga = async (id: string, valores: any[]): Promise<vagasEmprego[]> => {
    try {
      const vagaAtualizada = await connection("vagas").where({ id }).update(
        {
          cargo: valores[0],
          modalidade: valores[1],
          cidade: valores[2],
          horas: valores[3],
          principais_atividades: valores[4],
          beneficios: valores[5],
          requisitos: valores[6],
          data_publicacao: valores[7],
          como_se_inscrever: valores[8],
          tipo_vinculo: valores[9],
          quantidade: valores[10],
        },
        ["*"],
      );

      return vagaAtualizada;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  patchEvento = async (id: string, valores: any[]): Promise<evento[]> => {
    try {
      const [eventoAtualizado] = await connection("eventos")
        .where({ id })
        .update(
          {
            titulo: valores[0],
            descricao: valores[1],
            data_inicio: valores[2],
            data_fim: valores[3],
            status: valores[4],
            publico_alvo: valores[5],
            quantidade: valores[6],
          },
          ["*"],
        );
      return [eventoAtualizado];
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
