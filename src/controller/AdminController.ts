import { Request, Response } from "express";
import { AdminBusiness } from "../business/AdminBusiness";
import { ResponseBuilder } from "../ResponseBuilder";
import {
  adminAPIretorno,
  localizacaoAPIretorno,
} from "../types/apiRetornoTipos";
import { exame, vagasEmprego } from "../types/entidades";

export class AdminController {
  private adminBusiness = new AdminBusiness();

  deletarExamePorId = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<exame>>();

    try {
      const id = Number(req.params.id);
      const jwt_auth = req.headers.authorization;

      if (isNaN(id) || !Number.isInteger(id)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Id esta incorreto..");
        responseBuilder.adicionarBody({ sucesso: false });

        responseBuilder.construir(res);

        return;
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Token necessario não existe");
        responseBuilder.adicionarBody({ sucesso: false });

        responseBuilder.construir(res);

        return;
      }

      await this.adminBusiness.deletarExamePorId(id, jwt_auth, responseBuilder);

      responseBuilder.construir(res);
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );
      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

      responseBuilder.construir(res);
    }
  };

  deletarVagasPorId = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<exame>>();

    try {
      const id = Number(req.params.id);
      const jwt_auth = req.headers.authorization;

      if (isNaN(id) || !Number.isInteger(id)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Id esta incorreto..");
        responseBuilder.adicionarBody({ sucesso: false });

        responseBuilder.construir(res);

        return;
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Token necessario não existe");
        responseBuilder.adicionarBody({ sucesso: false });

        responseBuilder.construir(res);

        return;
      }

      await this.adminBusiness.deletarVagasPorId(id, jwt_auth, responseBuilder);

      responseBuilder.construir(res);
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );
      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

      responseBuilder.construir(res);
    }
  };

  deletarNoticiaPorId = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<exame>>();

    try {
      const id = Number(req.params.id);
      const jwt_auth = req.headers.authorization;

      if (isNaN(id) || !Number.isInteger(id)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Id esta incorreto..");
        responseBuilder.adicionarBody({ sucesso: false });

        responseBuilder.construir(res);

        return;
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem("Token necessario não existe");
        responseBuilder.adicionarBody({ sucesso: false });

        responseBuilder.construir(res);

        return;
      }

      await this.adminBusiness.deletarExamePorId(id, jwt_auth, responseBuilder);

      responseBuilder.construir(res);
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );
      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

      responseBuilder.construir(res);
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
        responseBuilder.construir(res);
        return;
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        responseBuilder.construir(res);
        return;
      }

      await this.adminBusiness.executarLogicaCriacaoExame(
        responseBuilder,
        jwt_auth,
        [nome, descricao, local_id],
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );
      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

      responseBuilder.construir(res);
    }
  };

  criarVaga = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<
      adminAPIretorno<vagasEmprego>
    >();

    try {
      const {
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
        responseBuilder.construir(res);
        return;
      }

      // Validação do enum modalidade
      if (!["PRESENCIAL", "HOME-OFFICE", "VAZIO"].includes(modalidade)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'modalidade' deve ser um dos valores: 'PRESENCIAL', 'HOME-OFFICE' ou 'VAZIO'!",
        );
        responseBuilder.construir(res);
        return;
      }

      // Validação do enum tipo_vinculo
      if (!["CLT", "PJ", "ESTAGIO", "VAZIO"].includes(tipo_vinculo)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'tipo_vinculo' deve ser um dos valores: 'CLT', 'PJ', 'ESTAGIO' ou 'VAZIO'!",
        );
        responseBuilder.construir(res);
        return;
      }

      // Validação da quantidade
      if (isNaN(quantidade) || quantidade <= 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'quantidade' deve ser um número inteiro positivo!",
        );
        responseBuilder.construir(res);
        return;
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        responseBuilder.construir(res);
        return;
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
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );
      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
      responseBuilder.construir(res);
    }
  };

  patchExame = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<adminAPIretorno<exame>>();

    try {
      const { nome, descricao, local_id } = req.body;
      const id = Number(req.params.id);
      const jwt_auth = req.headers.authorization;

      if (!Number.isInteger(id)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem("Erro, parametro id esta incorreto");
        responseBuilder.construir(res);
        return;
      }

      if (!nome || !descricao || !local_id) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, todos os parametros: 'nome', 'descricao', 'local_id' são obrigatorios!",
        );
        responseBuilder.construir(res);
        return;
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );

        responseBuilder.adicionarBody({ sucesso: false });
        responseBuilder.construir(res);
        return;
      }

      await this.adminBusiness.executarLogicaPatchExame(
        responseBuilder,
        jwt_auth,
        [nome, descricao, local_id],
        id,
      );

      responseBuilder.construir(res);
    } catch (err: any) {
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );
      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);

      responseBuilder.construir(res);
    }
  };

  patchVaga = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<
      adminAPIretorno<vagasEmprego>
    >();

    try {
      const {
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

      const id = Number(req.params.id);
      const jwt_auth = req.headers.authorization;

      if (!Number.isInteger(id)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem("Erro, parâmetro id está incorreto");
        responseBuilder.construir(res);
        return;
      }

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
          "Erro, todos os campos obrigatórios: 'cargo', 'modalidade', 'cidade', 'data_publicacao', 'tipo_vinculo' e 'quantidade' devem ser fornecidos!",
        );
        responseBuilder.construir(res);
        return;
      }

      // Validação do enum modalidade
      if (!["PRESENCIAL", "HOME-OFFICE", "VAZIO"].includes(modalidade)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'modalidade' deve ser um dos valores: 'PRESENCIAL', 'HOME-OFFICE' ou 'VAZIO'!",
        );
        responseBuilder.construir(res);
        return;
      }

      // Validação do enum tipo_vinculo
      if (!["CLT", "PJ", "ESTAGIO", "VAZIO"].includes(tipo_vinculo)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'tipo_vinculo' deve ser um dos valores: 'CLT', 'PJ', 'ESTAGIO' ou 'VAZIO'!",
        );
        responseBuilder.construir(res);
        return;
      }

      // Validação da quantidade
      if (isNaN(quantidade) || quantidade <= 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, 'quantidade' deve ser um número inteiro positivo!",
        );
        responseBuilder.construir(res);
        return;
      }

      if (!jwt_auth) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );
        responseBuilder.adicionarMensagem(
          "Erro, TOKEN de verificação admin não foi encontrado!",
        );
        responseBuilder.adicionarBody({ sucesso: false });
        responseBuilder.construir(res);
        return;
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
      responseBuilder.adicionarCodigoStatus(
        responseBuilder.STATUS_CODE_SERVER_ERROR,
      );
      responseBuilder.adicionarMensagem(err.sqlMessage || err.message);
      responseBuilder.construir(res);
    }
  };
}
