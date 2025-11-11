import { connection } from "../dbConnection";
import { exame, noticia, vagasEmprego } from "../types/entidades";

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

  buscarExamePorId = async (id: number): Promise<any> => {
    try {
      const exame = await connection
        .select("id")
        .from("exames")
        .where("id_incremental", id)
        .first();

      return exame;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  buscarNoticiaPorId = async (id: number): Promise<any> => {
    try {
      const noticia = await connection
        .select("id")
        .from("noticias")
        .where("id_incremental", id)
        .first();

      return noticia;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  buscarVagaPorId = async (id: number): Promise<any> => {
    try {
      const vaga = await connection
        .select("id")
        .from("vagas")
        .where("id_incremental", id)
        .first();

      return vaga;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  deletarExamePorId = async (id: number): Promise<number> => {
    try {
      const exame = await connection
        .select("id")
        .from("exames")
        .where({ id_incremental: id })
        .first();

      if (!exame) {
        return 0;
      }

      await connection("exames").where({ id_incremental: id }).del();

      return 1;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  deletarNoticiaPorId = async (id: number): Promise<number> => {
    try {
      const noticia = await connection
        .select("id")
        .from("noticias")
        .where({ id_incremental: id })
        .first();

      if (!noticia) {
        return 0;
      }

      await connection("noticias").where({ id_incremental: id }).del();

      return 1;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  deletarVagaPorId = async (id: number): Promise<number> => {
    try {
      const vaga = await connection
        .select("id")
        .from("vagas")
        .where({ id_incremental: id })
        .first();

      if (!vaga) {
        return 0;
      }

      await connection("vagas").where({ id_incremental: id }).del();

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

  criarNoticia = async (valores: any[]): Promise<noticia[]> => {
    try {
      const noticiasCriadas = await connection
        .insert(
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
        )
        .into("noticias");

      return noticiasCriadas;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  criarVaga = async (valores: any[]): Promise<vagasEmprego[]> => {
    try {
      const vagaCriada = await connection
        .insert(
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
        )
        .into("vagas");

      return vagaCriada;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  patchExame = async (id: number, valores: string[]): Promise<exame[]> => {
    try {
      const examesCriados = await connection("exames")
        .where("id_incremental", id)
        .update(
          { nome: valores[0], descricao: valores[1], local_id: valores[3] },
          ["*"],
        );

      return examesCriados;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  patchNoticia = async (id: number, valores: any[]): Promise<noticia[]> => {
    try {
      const noticiaAtualizada = await connection("noticias")
        .where("id_incremental", id)
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

  patchVaga = async (id: number, valores: any[]): Promise<vagasEmprego[]> => {
    try {
      const vagaAtualizada = await connection("vagas")
        .where("id_incremental", id)
        .update(
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
}
