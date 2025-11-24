import { Request, Response } from "express";
import { ResponseBuilder } from "../ResponseBuilder";
import { VagasBusiness } from "../business/VagasBusiness";
import { vagasAPIretorno } from "../types/apiRetornoTipos";
import { catchErros, filtrosVaga, vagasVinculo } from "../types/entidades";

export class VagasController {
  private vagasBusiness = new VagasBusiness();

  buscarTodasVagas = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<vagasAPIretorno>();

    try {
      await this.vagasBusiness.obterTodasAsVagas(responseBuilder);
      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message === catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );

        responseBuilder.adicionarMensagem(`${err.sqlMessage || err.message}`);

        responseBuilder.construir(res);
      }
    }
  };

  buscarVagaPorId = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<vagasAPIretorno>();

    try {
      const vagaId = req.params.id;

      if (!vagaId) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro: 'id' esta incorreto ou faltando!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      await this.vagasBusiness.obterVagaPorId(vagaId, responseBuilder);

      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message === catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );

        responseBuilder.adicionarMensagem(`${err.sqlMessage || err.message}`);

        responseBuilder.construir(res);
      }
    }
  };

  buscarVagasPorFiltro = async (req: Request, res: Response) => {
    const responseBuilder = new ResponseBuilder<vagasAPIretorno>();

    try {
      const { cargo, cidade, modalidade, tipo_vinculo, recentes, beneficios } =
        req.query;

      if (
        !cargo &&
        !cidade &&
        !modalidade &&
        !tipo_vinculo &&
        !recentes &&
        !beneficios
      ) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro: 'cargo', 'cidade', 'modalidade', 'tipo_vinculo', 'recentes' e 'beneficios' esta incorreto ou faltando!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (cargo?.toString().trim().length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro: 'cargo' precisa ter algum conteudo!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (cidade?.toString().trim().length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro: 'cidade' precisa ter algum conteudo!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (modalidade?.toString().trim().length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro: 'modalidade' precisa ter algum conteudo!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (tipo_vinculo?.toString().trim().length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro: 'tipo_vinculo' precisa ter algum conteudo!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (recentes?.toString().trim().length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro: 'recentes' precisa ter algum conteudo!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      if (beneficios?.toString().trim().length === 0) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro: 'beneficios' precisa ter algum conteudo!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      let filtros: filtrosVaga = {};
      const recentes_numerico = Number(recentes);

      if (recentes && !Number.isInteger(recentes_numerico)) {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_ERRO_USUARIO,
        );

        responseBuilder.adicionarMensagem(
          "Parametro: 'recentes' precisa ter ser numerico e inteiro!",
        );

        throw new Error(catchErros.CLIENTE);
      }

      cargo != undefined ? (filtros.cargo = cargo.toString()) : undefined;
      cidade != undefined ? (filtros.cidade = cidade.toString()) : undefined;
      modalidade != undefined
        ? (filtros.modalidade = modalidade.toString())
        : undefined;
      tipo_vinculo != undefined
        ? (filtros.tipo_vinculo = tipo_vinculo.toString().toUpperCase())
        : undefined;
      recentes != undefined
        ? (filtros.recentes = recentes_numerico)
        : undefined;
      beneficios != undefined
        ? (filtros.beneficios = beneficios.toString().toLowerCase())
        : undefined;

      await this.vagasBusiness.obterVagaPorFiltro(filtros, responseBuilder);
      responseBuilder.construir(res);
    } catch (err: any) {
      if (err.message === catchErros.CLIENTE) {
        responseBuilder.construir(res);
      } else {
        responseBuilder.adicionarCodigoStatus(
          responseBuilder.STATUS_CODE_SERVER_ERROR,
        );

        responseBuilder.adicionarMensagem(`${err.sqlMessage || err.message}`);

        responseBuilder.construir(res);
      }
    }
  };
}
