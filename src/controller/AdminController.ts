import { Request, Response } from "express";
import { AdminBusiness } from "../business/AdminBusiness";
import { ResponseBuilder } from "../ResponseBuilder";
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

export class AdminController {
  private adminBusiness = new AdminBusiness();

  deletarExamePorId = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<exame>>();

    try {
      const id = req.params.id;
      const jwt_auth = req.headers.authorization;

      if (!id || id.length === 0 || id.trim().length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Id esta incorreto..");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Token necessario não existe");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      await this.adminBusiness.deletarExamePorId(id, jwt_auth, responseBuilder);

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message === catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );
        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

        responseBuilder.construir(res);
      }
    }
  };

  deletarVagasPorId = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<exame>>();

    try {
      const id = req.params.id;
      const jwt_auth = req.headers.authorization;

      if (!id) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Id esta incorreto..");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Token necessario não existe");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      await this.adminBusiness.deletarVagasPorId(id, jwt_auth, responseBuilder);

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );
        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

        responseBuilder.construir(res);
      }
    }
  };

  deletarNoticiaPorId = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<noticia>>();

    try {
      const id = req.params.id;
      const jwt_auth = req.headers.authorization;

      if (!id) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Id esta incorreto..");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Token necessario não existe");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      await this.adminBusiness.deletarNoticiaPorId(
        id,
        jwt_auth,
        responseBuilder,
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );
        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

        responseBuilder.construir(res);
      }
    }
  };

  deletarEventosPorId = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<evento>>();

    try {
      const id = req.params.id;
      const jwt_auth = req.headers.authorization;

      if (!id) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Id esta incorreto..");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Token necessario não existe");
        responseBuilder.adicionarBody({ sucesso: false });

        throw new Error(catchErros.CLIENTE);
      }

      await this.adminBusiness.deletarEventosPorId(
        id,
        jwt_auth,
        responseBuilder,
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );
        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

        responseBuilder.construir(res);
      }
    }
  };

  criarExame = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<exame>>();

    try {
      const { nome, descricao, local_id } = req.body;
      const jwt_auth = req.headers.authorization;

      if (!nome || !descricao || !local_id) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, todos os parametros: 'nome', 'descricao', 'local_id' são obrigatorios!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      await this.adminBusiness.executarLogicaCriacaoExame(
        responseBuilder,
        jwt_auth,
        [nome, descricao, local_id],
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );
        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

        responseBuilder.construir(res);
      }
    }
  };

  criarVaga = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<
      adminAPIretorno<vagasEmprego>
    >();

    try {
      let {
        cargo,
        modalidade,
        cidade,
        horas,
        principais_atividades,
        beneficios,
        requisitos,
        data_publicacao,
        como_se_inscrever,
        tipo_vinculo,
        quantidade,
      } = req.body;

      const jwt_auth = req.headers.authorization;

      // Validações obrigatórias
      if (
        !cargo ||
        !modalidade ||
        !cidade ||
        !data_publicacao ||
        !tipo_vinculo ||
        !quantidade
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, os campos obrigatórios 'cargo', 'modalidade', 'cidade', 'data_publicacao', 'tipo_vinculo' e 'quantidade' devem ser fornecidos!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      modalidade = modalidade.toUpperCase();
      // Validação do enum modalidade
      if (!["PRESENCIAL", "HOME-OFFICE", "VAZIO"].includes(modalidade)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'modalidade' deve ser um dos valores: 'PRESENCIAL', 'HOME-OFFICE' ou 'VAZIO'!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      tipo_vinculo = tipo_vinculo.toUpperCase();
      // Validação do enum tipo_vinculo
      if (!["CLT", "PJ", "ESTAGIO", "VAZIO"].includes(tipo_vinculo)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'tipo_vinculo' deve ser um dos valores: 'CLT', 'PJ', 'ESTAGIO' ou 'VAZIO'!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      // Validação da quantidade
      if (isNaN(quantidade) || quantidade <= 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'quantidade' deve ser um número inteiro positivo!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      await this.adminBusiness.executarLogicaCriacaoVaga(
        responseBuilder,
        jwt_auth,
        [
          cargo,
          modalidade,
          cidade,
          horas,
          principais_atividades,
          beneficios,
          requisitos,
          data_publicacao,
          como_se_inscrever,
          tipo_vinculo,
          quantidade,
        ],
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );
        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

        responseBuilder.construir(res);
      }
    }
  };

  criarNoticia = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<noticia>>();

    try {
      const {
        noticia_id_fundacao,
        titulo,
        resumo,
        conteudo,
        data_publicacao,
        tags,
        imagens,
        outros_links,
      } = req.body;

      const jwt_auth = req.headers.authorization;

      // Validações obrigatórias
      if (!noticia_id_fundacao || !titulo || !conteudo || !data_publicacao) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, todos os campos obrigatórios: 'noticia_id_fundacao', 'titulo', 'conteudo' e 'data_publicacao' devem ser fornecidos!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      // Validação do noticia_id_fundacao
      if (
        !Number.isInteger(Number(noticia_id_fundacao)) ||
        Number(noticia_id_fundacao) <= 0
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'noticia_id_fundacao' deve ser um número inteiro positivo!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      // Validação da data_publicacao
      const data = new Date(Number(data_publicacao));
      if (isNaN(data.getTime())) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'data_publicacao' deve ser uma data válida!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      await this.adminBusiness.executarLogicaCriacaoNoticia(
        responseBuilder,
        jwt_auth,
        [
          noticia_id_fundacao,
          titulo,
          resumo,
          conteudo,
          data_publicacao,
          tags,
          imagens,
          outros_links,
        ],
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );
        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
        responseBuilder.construir(res);
      }
    }
  };

  criarEvento = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<evento>>();

    try {
      const {
        titulo,
        descricao,
        data_inicio,
        data_fim,
        status,
        publico_alvo,
        quantidade,
      } = req.body;
      const jwt_auth = req.headers.authorization;

      // obrigatórios
      if (!titulo && !data_inicio && !data_fim && !status && !quantidade) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, campos obrigatórios: 'titulo', 'data_inicio', 'data_fim', 'status' e 'quantidade' devem ser fornecidos!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      // enum status
      if (
        !["programado", "em_andamento", "concluido", "cancelado"].includes(
          status,
        )
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'status' deve ser um dos valores: 'programado', 'em_andamento', 'concluido' ou 'cancelado'!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      // quantidade > 0
      if (isNaN(Number(quantidade)) || Number(quantidade) <= 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'quantidade' deve ser um número inteiro positivo!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      await this.adminBusiness.executarLogicaCriacaoEvento(
        responseBuilder,
        jwt_auth,
        [
          titulo,
          descricao,
          data_inicio,
          data_fim,
          status,
          publico_alvo,
          quantidade,
        ],
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );
        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
        responseBuilder.construir(res);
      }
    }
  };

  patchExame = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<exame>>();

    try {
      const { nome, descricao, local_id } = req.body;
      const id = req.params.id;
      const jwt_auth = req.headers.authorization;

      console.log(id);

      if (!id) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem("Erro, parametro id esta incorreto");
        throw new Error(catchErros.CLIENTE);
      }

      if (!nome && !descricao && !local_id) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, todos os parametros: 'nome', 'descricao', 'local_id' são obrigatorios!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      await this.adminBusiness.executarLogicaPatchExame(
        responseBuilder,
        jwt_auth,
        [nome, descricao, local_id],
        id as string,
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );
        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

        responseBuilder.construir(res);
      }
    }
  };

  patchNoticia = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<noticia>>();

    try {
      const {
        noticia_id_fundacao,
        titulo,
        resumo,
        conteudo,
        data_publicacao,
        tags,
        imagens,
        outros_links,
      } = req.body;

      const id = req.params.id;
      const jwt_auth = req.headers.authorization;

      if (!id) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem("Erro, parâmetro id está incorreto");
        throw new Error(catchErros.CLIENTE);
      }

      // Validações obrigatórias
      if (!noticia_id_fundacao && !titulo && !conteudo && !data_publicacao) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, E obrigatório pelo menos um dos campos: 'noticia_id_fundacao', 'titulo', 'conteudo' e 'data_publicacao' devem ser fornecidos!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      // Validação do noticia_id_fundacao
      if (noticia_id_fundacao && noticia_id_fundacao.trim().length <= 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'noticia_id_fundacao' precisa conter algo",
        );
        throw new Error(catchErros.CLIENTE);
      }

      // Validação da data_publicacao
      if (data_publicacao) {
        const data = new Date(Number(data_publicacao));
        if (isNaN(data.getTime())) {
          responseBuilder.adicionarCodigoStatus(
            responseBuilder.STATUS_CODE_ERRO_USUARIO,
          );
          responseBuilder.adicionarMensagem(
            "Erro, 'data_publicacao' deve ser uma data válida!",
          );
          throw new Error(catchErros.CLIENTE);
        }
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      await this.adminBusiness.executarLogicaPatchNoticia(
        responseBuilder,
        jwt_auth,
        [
          noticia_id_fundacao,
          titulo,
          resumo,
          conteudo,
          data_publicacao,
          tags,
          imagens,
          outros_links,
        ],
        id,
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );
        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
        responseBuilder.construir(res);
      }
    }
  };

  patchVaga = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<
      adminAPIretorno<vagasEmprego>
    >();

    try {
      let {
        cargo,
        modalidade,
        cidade,
        horas,
        principais_atividades,
        beneficios,
        requisitos,
        data_publicacao,
        como_se_inscrever,
        tipo_vinculo,
        quantidade,
      } = req.body;

      const id = req.params.id;
      const jwt_auth = req.headers.authorization;

      if (!id) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem("Erro, parâmetro id está incorreto");
        throw new Error(catchErros.CLIENTE);
      }

      // Validações obrigatórias
      if (
        !cargo &&
        !modalidade &&
        !cidade &&
        !data_publicacao &&
        !tipo_vinculo &&
        !quantidade
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, todos os campos obrigatórios: 'cargo', 'modalidade', 'cidade', 'data_publicacao', 'tipo_vinculo' e 'quantidade' devem ser fornecidos!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      modalidade ? (modalidade = modalidade.toUpperCase()) : undefined;
      // Validação do enum modalidade
      if (
        modalidade &&
        !["PRESENCIAL", "HOME-OFFICE", "VAZIO"].includes(modalidade)
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'modalidade' deve ser um dos valores: 'PRESENCIAL', 'HOME-OFFICE' ou 'VAZIO'!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      tipo_vinculo ? (tipo_vinculo = tipo_vinculo.toUpperCase()) : undefined;

      // Validação do enum tipo_vinculo
      if (
        tipo_vinculo &&
        !["CLT", "PJ", "ESTAGIO", "VAZIO"].includes(tipo_vinculo)
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'tipo_vinculo' deve ser um dos valores: 'CLT', 'PJ', 'ESTAGIO' ou 'VAZIO'!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      // Validação da quantidade
      if (quantidade && (isNaN(quantidade) || quantidade <= 0)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'quantidade' deve ser um número inteiro positivo!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      await this.adminBusiness.executarLogicaPatchVaga(
        responseBuilder,
        jwt_auth,
        [
          cargo,
          modalidade,
          cidade,
          horas,
          principais_atividades,
          beneficios,
          requisitos,
          data_publicacao,
          como_se_inscrever,
          tipo_vinculo,
          quantidade,
        ],
        id,
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );
        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
        responseBuilder.construir(res);
      }
    }
  };

  patchEvento = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<evento>>();

    try {
      const {
        titulo,
        descricao,
        data_inicio,
        data_fim,
        status,
        publico_alvo,
        quantidade,
      } = req.body;

      const id = req.params.id;
      const jwt_auth = req.headers.authorization;

      if (!id) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem("Erro, parâmetro id está incorreto");
        throw new Error(catchErros.CLIENTE);
      }

      if (
        !titulo &&
        !data_inicio &&
        !data_fim &&
        !status &&
        !quantidade &&
        !publico_alvo
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, E preciso pelo menos um desses campos: 'titulo', 'data_inicio', 'data_fim', 'status' e 'quantidade' devem ser fornecidos!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      if (
        status &&
        !["programado", "em_andamento", "concluido", "cancelado"].includes(
          status,
        )
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'status' deve ser um dos valores: 'programado', 'em_andamento', 'concluido' ou 'cancelado'!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      if (
        quantidade &&
        (isNaN(Number(quantidade)) || Number(quantidade) <= 0)
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'quantidade' deve ser um número inteiro positivo!",
        );
        throw new Error(catchErros.CLIENTE);
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        throw new Error(catchErros.CLIENTE);
      }

      await this.adminBusiness.executarLogicaPatchEvento(
        responseBuilder,
        jwt_auth,
        [
          titulo,
          descricao,
          data_inicio,
          data_fim,
          status,
          publico_alvo,
          quantidade,
        ],
        id as string,
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message == catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );
        responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
        responseBuilder.construir(res);
      }
    }
  };
}
