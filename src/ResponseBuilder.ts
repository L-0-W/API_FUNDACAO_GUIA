// Importações:
// - Response do Express para tipar o objeto de resposta HTTP.
// - apiRetorno é um tipo genérico que define a estrutura da resposta da API.
// - exame é importado mas não é usado no código atual — possivelmente sobra de refactor.
import { Response } from "express";
import { apiRetorno } from "./types/apiRetornoTipos";
import { exame } from "./types/entidades";

// Classe genérica ResponseBuilder<T>:
// Permite construir respostas de API de forma estruturada e reutilizável,
// com tipo flexível para o corpo da resposta.
export class ResponseBuilder<T> {
  // Constantes de status HTTP comuns, definidas como propriedades públicas e imutáveis
  // para facilitar o uso consistente e legível.
  public readonly STATUS_CODE_OK: number = 200;
  public readonly STATUS_CODE_VAZIO: number = 404;
  public readonly STATUS_CODE_ERRO_USUARIO: number = 400;
  public readonly STATUS_CODE_SERVER_ERROR: number = 500;
  public readonly STATUS_CODE_NAO_AUTORIZADO: number = 401;
  public readonly STATUS_CODE_ERRO_SEMANTICO: number = 422;
  public readonly STATUS_CODE_OK_CRIADO: number = 201;

  // Objeto de resposta interno que armazena os dados da resposta
  // (status, body, mensagem, etc.) antes de ser enviado ao cliente.
  private retorno: apiRetorno<T> = {};

  // Define o código de status HTTP da resposta.
  // O 'return' explícito não é necessário (método é void), mas não causa problemas.
  public adicionarCodigoStatus(status: number) {
    this.retorno.codigoStatus = status;
    return;
  }

  // Define o corpo da resposta com tipo genérico T.
  public adicionarBody(body: T) {
    this.retorno.body = body;
    return;
  }

  // Define uma mensagem descritiva (ex: "Exame não encontrado") que acompanha a resposta.
  public adicionarMensagem(msg: string) {
    this.retorno.mensagem = msg;
    return;
  }

  // Envia a resposta:
  // - Aplica o código de status (padrão 500 se não definido).
  // - Envia o objeto 'retorno' como JSON.
  // - O comentário indica uma tarefa pendente: calcular um campo 'total'
  //   com base no tamanho de um array (ex: contagem de itens), mas isso não está implementado.
  public construir(res: Response) {
    // ver o tamanho da array de exames/noticias para preencher total.
    res.status(this.retorno.codigoStatus || 500).json(this.retorno);
  }
}
