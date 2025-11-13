import { AdminData } from "../data/AdminData";
import { ResponseBuilder } from "../ResponseBuilder";
import { verificarToken } from "../middleware/jwtVerificacao";
import {
  adminAPIretorno,
  localizacaoAPIretorno,
} from "../types/apiRetornoTipos";
import {
  catchErros,
  evento,
  exame,
  noticia,
  vagasEmprego,
} from "../types/entidades";
import { X509Certificate } from "node:crypto";
import e from "cors";
import { describe } from "node:test";

export class AdminBusiness {
  private adminData = new AdminData();

  deletarExamePorId = async (
    id: number,
    token: string,
    responseBuilder: ResponseBuilder<adminAPIretorno<exame>>,
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado == undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );

        responseBuilder.adicionarMensagem("Erro ao tentar formatar token...");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      const eValido = verificarToken(tokenFormatado);

      console.log(eValido);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_NAO_AUTORIZADO,
        );

        responseBuilder.adicionarMensagem(
          "O token recebido esta expirado ou não e valido...",
        );

        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      const resultado = await this.adminData.deletarExamePorId(id);

      if (resultado == 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem("Exame não econtrado...");
        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarMensagem("Exame deletado com sucesso");
      responseBuilder.adicionarBody({ sucesso: true, total: 1 });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  deletarEventosPorId = async (
    id: number,
    token: string,
    responseBuilder: ResponseBuilder<adminAPIretorno<exame>>,
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado == undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );

        responseBuilder.adicionarMensagem("Erro ao tentar formatar token...");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      const eValido = verificarToken(tokenFormatado);

      console.log(eValido);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_NAO_AUTORIZADO,
        );

        responseBuilder.adicionarMensagem(
          "O token recebido esta expirado ou não e valido...",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      const resultado = await this.adminData.deletarExamePorId(id);

      if (resultado == 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem("Evento não econtrado...");
        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarMensagem("Evento deletado com sucesso");
      responseBuilder.adicionarBody({ sucesso: true, total: 1 });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  deletarVagasPorId = async (
    id: number,
    token: string,
    responseBuilder: ResponseBuilder<adminAPIretorno<vagasEmprego>>,
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado == undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );

        responseBuilder.adicionarMensagem("Erro ao tentar formatar token...");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      const eValido = verificarToken(tokenFormatado);

      console.log(eValido);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_NAO_AUTORIZADO,
        );
        responseBuilder.adicionarMensagem(
          "O token recebido esta expirado ou não e valido...",
        );
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }
      const resultado = await this.adminData.deletarVagaPorId(id);

      if (resultado == 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem("Vaga não econtrado...");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarMensagem("Vaga deletado com sucesso");
      responseBuilder.adicionarBody({ sucesso: true, total: 1 });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  deletarNoticiaPorId = async (
    id: number,
    token: string,
    responseBuilder: ResponseBuilder<adminAPIretorno<exame>>,
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado == undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
        );

        responseBuilder.adicionarMensagem("Erro ao tentar formatar token...");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      const eValido = verificarToken(tokenFormatado);

      console.log(eValido);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_NAO_AUTORIZADO,
        );

        responseBuilder.adicionarMensagem(
          "O token recebido esta expirado ou não e valido...",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      const resultado = await this.adminData.deletarExamePorId(id);

      if (resultado == 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_VAZIO,
        );

        responseBuilder.adicionarMensagem("Noticia não econtrado...");
        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarMensagem("Noticia deletado com sucesso");
      responseBuilder.adicionarBody({ sucesso: true, total: 1 });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  executarLogicaCriacaoExame = async (
    responseBuilder: ResponseBuilder<adminAPIretorno<exame>>,
    token: string,
    exame_values: string[],
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado === undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, algo de errado esta no seu header de autorização",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      const eValido = verificarToken(tokenFormatado);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, TOKEN incorreto ou expirado!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      exame_values.forEach((e) => {
        if (e.trim().length === 0) {
          responseBuilder.adicionarCodigoStatus(
            responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
          );

          responseBuilder.adicionarMensagem(
            "Parametros não pode incluir apenas espaços, e necessario algum valor",
          );

          responseBuilder.adicionarBody({ sucesso: false });
          throw new Error(catchErros.CLIENTE);
        }
      });

      const id = Number(exame_values[3]);

      if (!Number.isInteger(id)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao tentar transformar 'local_id' em numero, verifique se e um numero inteiro e se existe!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      const localExiste = await this.adminData.buscarLocalPorId(id);

      if (!localExiste) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao tentar encontrar local usando 'local_id', verifique se esse local existe!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      const examesCriados = await this.adminData.criarExame(exame_values);

      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_OK_CRIADO,
      );
      responseBuilder.adicionarBody({
        sucesso: true,
        total: 1,
        data: examesCriados,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  executarLogicaCriacaoNoticia = async (
    responseBuilder: ResponseBuilder<adminAPIretorno<noticia>>,
    token: string,
    noticia_values: any[], // [noticia_id_fundacao, titulo, resumo, conteudo, data_publicacao, tags, imagens, outros_links]
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado === undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, algo de errado esta no seu header de autorização",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const eValido = verificarToken(tokenFormatado);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, TOKEN incorreto ou expirado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Validação de campos obrigatórios que não podem ser só espaços
      const camposObrigatorios = [1, 3]; // titulo, conteudo
      for (const idx of camposObrigatorios) {
        if (
          typeof noticia_values[idx] === "string" &&
          noticia_values[idx].trim().length === 0
        ) {
          responseBuilder.adicionarCodigoStatus(
            responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
          );
          responseBuilder.adicionarMensagem(
            "Parametros não pode incluir apenas espaços, e necessario algum valor",
          );
          responseBuilder.adicionarBody({ sucesso: false });
          return;
        }
      }

      // Validação do noticia_id_fundacao
      const noticiaIdFundacao = Number(noticia_values[0]);
      if (!Number.isInteger(noticiaIdFundacao) || noticiaIdFundacao <= 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'noticia_id_fundacao' deve ser um número inteiro positivo!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Validação da data_publicacao
      const data = new Date(noticia_values[4]);
      if (isNaN(data.getTime())) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'data_publicacao' deve ser uma data válida!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const noticiasCriadas = await this.adminData.criarNoticia(noticia_values);

      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_OK_CRIADO,
      );
      responseBuilder.adicionarBody({
        sucesso: true,
        total: 1,
        data: noticiasCriadas,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  executarLogicaCriacaoEvento = async (
    responseBuilder: ResponseBuilder<adminAPIretorno<evento>>,
    token: string,
    evento_values: any[], // [titulo, descricao, data_inicio, data_fim, status, publico_alvo, quantidade]
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];
      if (!tokenFormatado) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, algo de errado esta no seu header de autorização",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      if (!verificarToken(tokenFormatado)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, TOKEN incorreto ou expirado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // campos obrigatórios não podem ser só espaços
      const obr = [0, 2, 3, 4, 6]; // titulo, data_inicio, data_fim, status, quantidade
      for (const i of obr) {
        if (
          typeof evento_values[i] === "string" &&
          evento_values[i].trim().length === 0
        ) {
          responseBuilder.adicionarCodigoStatus(
            responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
          );
          responseBuilder.adicionarMensagem(
            "Parametros não pode incluir apenas espaços, e necessario algum valor",
          );
          responseBuilder.adicionarBody({ sucesso: false });
          return;
        }
      }

      // datas válidas
      const dtInicio = new Date(evento_values[2]);
      const dtFim = new Date(evento_values[3]);
      if (isNaN(dtInicio.getTime()) || isNaN(dtFim.getTime())) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'data_inicio' e 'data_fim' devem ser datas válidas!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const qtd = Number(evento_values[6]);
      if (!Number.isInteger(qtd) || qtd <= 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'quantidade' deve ser um número inteiro positivo!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const eventosCriados = await this.adminData.criarEvento(evento_values);

      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_OK_CRIADO,
      );
      responseBuilder.adicionarBody({
        sucesso: true,
        total: 1,
        data: eventosCriados,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  executarLogicaCriacaoVaga = async (
    responseBuilder: ResponseBuilder<adminAPIretorno<vagasEmprego>>,
    token: string,
    vaga_values: any[], // [cargo, modalidade, cidade, horas, principais_atividades, beneficios, requisitos, data_publicacao, como_se_inscrever, tipo_vinculo, quantidade]
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado === undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, algo de errado esta no seu header de autorização",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const eValido = verificarToken(tokenFormatado);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, TOKEN incorreto ou expirado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Validação de campos vazios ou só com espaços
      const camposObrigatorios = [0, 1, 2, 9]; // cargo, modalidade, cidade, tipo_vinculo
      for (const idx of camposObrigatorios) {
        if (
          typeof vaga_values[idx] === "string" &&
          vaga_values[idx].trim().length === 0
        ) {
          responseBuilder.adicionarCodigoStatus(
            responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
          );
          responseBuilder.adicionarMensagem(
            "Parametros não pode incluir apenas espaços, e necessario algum valor",
          );
          responseBuilder.adicionarBody({ sucesso: false });
          return;
        }
      }

      // Validação da quantidade
      const quantidade = Number(vaga_values[10]);
      if (!Number.isInteger(quantidade) || quantidade <= 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'quantidade' deve ser um número inteiro positivo!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Validação da data_publicacao
      const data = new Date(vaga_values[7]);
      if (isNaN(data.getTime())) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'data_publicacao' deve ser uma data válida!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Criar a vaga
      const vagaCriada = await this.adminData.criarVaga(vaga_values);

      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_OK_CRIADO,
      );
      responseBuilder.adicionarBody({
        sucesso: true,
        total: 1,
        data: vagaCriada,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  executarLogicaPatchExame = async (
    responseBuilder: ResponseBuilder<adminAPIretorno<exame>>,
    token: string,
    exame_values: string[],
    id_exame: number,
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado === undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, algo de errado esta no seu header de autorização",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const eValido = verificarToken(tokenFormatado);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, TOKEN incorreto ou expirado!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      exame_values.forEach((e) => {
        if (e.trim().length === 0) {
          responseBuilder.adicionarCodigoStatus(
            responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
          );

          responseBuilder.adicionarMensagem(
            "Parametros não pode incluir apenas espaços, e necessario algum valor",
          );

          responseBuilder.adicionarBody({ sucesso: false });
          return;
        }
      });

      const id = Number(exame_values[3]);

      if (!Number.isInteger(id)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao tentar transformar 'local_id' em numero, verifique se e um numero inteiro e se existe!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const exameExiste = await this.adminData.buscarLocalPorId(id);

      if (!exameExiste) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao tentar encontrar exame usando 'id' fornecido, verifique se esse exame existe!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const examePatch = await this.adminData.patchExame(id, exame_values);

      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_OK_CRIADO,
      );
      responseBuilder.adicionarBody({
        sucesso: true,
        total: 1,
        data: examePatch,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  executarLogicaPatchNoticia = async (
    responseBuilder: ResponseBuilder<adminAPIretorno<noticia>>,
    token: string,
    noticia_values: any[], // [noticia_id_fundacao, titulo, resumo, conteudo, data_publicacao, tags, imagens, outros_links]
    id_noticia: number,
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado === undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, algo de errado esta no seu header de autorização",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const eValido = verificarToken(tokenFormatado);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, TOKEN incorreto ou expirado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Validação de campos obrigatórios que não podem ser só espaços
      const camposObrigatorios = [1, 3]; // titulo, conteudo
      for (const idx of camposObrigatorios) {
        if (
          typeof noticia_values[idx] === "string" &&
          noticia_values[idx].trim().length === 0
        ) {
          responseBuilder.adicionarCodigoStatus(
            responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
          );
          responseBuilder.adicionarMensagem(
            "Parametros não pode incluir apenas espaços, e necessario algum valor",
          );
          responseBuilder.adicionarBody({ sucesso: false });
          return;
        }
      }

      // Validação do noticia_id_fundacao
      const noticiaIdFundacao = Number(noticia_values[0]);
      if (!Number.isInteger(noticiaIdFundacao) || noticiaIdFundacao <= 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'noticia_id_fundacao' deve ser um número inteiro positivo!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Validação da data_publicacao
      const data = new Date(noticia_values[4]);
      if (isNaN(data.getTime())) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'data_publicacao' deve ser uma data válida!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Verifica se a notícia existe
      const noticiaExiste = await this.adminData.buscarNoticiaPorId(id_noticia);
      if (!noticiaExiste) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao tentar encontrar notícia usando 'id' fornecido, verifique se essa notícia existe!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Atualiza a notícia
      const noticiaPatch = await this.adminData.patchNoticia(
        id_noticia,
        noticia_values,
      );

      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_OK_CRIADO,
      );
      responseBuilder.adicionarBody({
        sucesso: true,
        total: 1,
        data: noticiaPatch,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  executarLogicaPatchVaga = async (
    responseBuilder: ResponseBuilder<adminAPIretorno<vagasEmprego>>,
    token: string,
    vaga_values: any[], // [cargo, modalidade, cidade, horas, principais_atividades, beneficios, requisitos, data_publicacao, como_se_inscrever, tipo_vinculo, quantidade]
    id_vaga: number,
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];

      if (tokenFormatado === undefined) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, algo de errado esta no seu header de autorização",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const eValido = verificarToken(tokenFormatado);

      if (!eValido) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, TOKEN incorreto ou expirado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Validação de campos obrigatórios que não podem ser só espaços
      const camposObrigatorios = [0, 1, 2, 9]; // cargo, modalidade, cidade, tipo_vinculo
      for (const idx of camposObrigatorios) {
        if (
          typeof vaga_values[idx] === "string" &&
          vaga_values[idx].trim().length === 0
        ) {
          responseBuilder.adicionarCodigoStatus(
            responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
          );
          responseBuilder.adicionarMensagem(
            "Parametros não pode incluir apenas espaços, e necessario algum valor",
          );
          responseBuilder.adicionarBody({ sucesso: false });
          return;
        }
      }

      // Validação da quantidade
      const quantidade = Number(vaga_values[10]);
      if (!Number.isInteger(quantidade) || quantidade <= 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'quantidade' deve ser um número inteiro positivo!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Validação da data_publicacao
      const data = new Date(vaga_values[7]);
      if (isNaN(data.getTime())) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'data_publicacao' deve ser uma data válida!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Verifica se a vaga existe
      const vagaExiste = await this.adminData.buscarVagaPorId(id_vaga);
      if (!vagaExiste) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao tentar encontrar vaga usando 'id' fornecido, verifique se essa vaga existe!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // Atualiza a vaga
      const vagaPatch = await this.adminData.patchVaga(id_vaga, vaga_values);

      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_OK_CRIADO,
      );
      responseBuilder.adicionarBody({
        sucesso: true,
        total: 1,
        data: vagaPatch,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  executarLogicaPatchEvento = async (
    responseBuilder: ResponseBuilder<adminAPIretorno<evento>>,
    token: string,
    evento_values: any[],
    id_evento: number,
  ) => {
    try {
      const tokenFormatado = token.split("Bearer ")[1];
      if (!tokenFormatado) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, algo de errado esta no seu header de autorização",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      if (!verificarToken(tokenFormatado)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "TOKEN não autorizado, TOKEN incorreto ou expirado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      // campos obrigatórios não podem ser só espaços
      const obr = [0, 2, 3, 4, 6];
      for (const i of obr) {
        if (
          typeof evento_values[i] === "string" &&
          evento_values[i].trim().length === 0
        ) {
          responseBuilder.adicionarCodigoStatus(
            responseBuilder.STATUS_CODE_ERRO_SEMANTICO,
          );
          responseBuilder.adicionarMensagem(
            "Parametros não pode incluir apenas espaços, e necessario algum valor",
          );
          responseBuilder.adicionarBody({ sucesso: false });
          return;
        }
      }

      const dtInicio = new Date(evento_values[2]);
      const dtFim = new Date(evento_values[3]);
      if (isNaN(dtInicio.getTime()) || isNaN(dtFim.getTime())) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'data_inicio' e 'data_fim' devem ser datas válidas!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const qtd = Number(evento_values[6]);
      if (!Number.isInteger(qtd) || qtd <= 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'quantidade' deve ser um número inteiro positivo!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const eventoExiste = await this.adminData.buscarEventoPorId(id_evento);
      if (!eventoExiste) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro ao tentar encontrar evento usando 'id' fornecido, verifique se esse evento existe!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        return;
      }

      const eventoPatch = await this.adminData.patchEvento(
        id_evento,
        evento_values,
      );

      responseBuilder.adicionarCodigoStatus(responseBuilder.STATUS_CODE_OK);
      responseBuilder.adicionarBody({
        sucesso: true,
        total: 1,
        data: eventoPatch,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
