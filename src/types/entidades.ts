export type admin = {
  id: number;
  nome: string;
  email: string;
  senha: string;
};

export type setor = {
  id: number;
  nome: string;
  tipo: string;
  bloco_id: number;
  andar: string;
  coordenada: string;
  descricao: string;
  ativo: boolean;
};

export type bloco = {
  id: number;
  nome: string;
  coordenada: string;
  descricao: string;
};

type referencia = {
  imagem: string[];
  descricao: string;
};

export type referencias = {
  bloco: referencia;
  setor: referencia;
};

export type evento = {
  id?: number;
  titulo?: string;
  descricao?: string;
  data_inicio?: number;
  data_fim?: number;
  status?: string;
  publico_alvo?: string;
};

export type noticia_DTO = {
  titulo: string;
  resumo: string;
  conteudo: string;
  data_publicacao: number;
  tags?: string[];
  imagens?: string[];
  outros_links?: string[];
};

export type params_noticia = {
  recentes?: number;
  bloco?: string;
  setor?: string;
  exame?: string;
  tags?: string[] | string;
};

export type noticia = {
  id?: number;
  noticia_id_fundacao?: number;
  titulo?: string;
  resumo?: string | null;
  conteudo?: string;
  data_publicacao?: number | string;
  tags?: string | null;
  imagens?: string | null;
  outros_links?: string | null;
  criado_em?: number | string;
  atualizado_em?: number | string;
};

export enum statusEvento {
  programado,
  em_andamento,
  concluido,
  cancelado,
}

export type eventos = {
  id?: number;
  titulo?: string;
  descricao?: string;
  data_inicio?: number | string;
  data_fim?: number | string;
  status?: statusEvento;
  publico_alvo?: string;
  quantidade?: number;
};

export type exame = {
  id: number;
  nome: string;
  descricao: string;
  local_id: number;
};

export type vagasStatus = "Ativa" | "Encerrada";

export type vagasVinculo = "CLT" | "PJ" | "ESTAGIO";

export type vagasEmprego = {
  id?: number;
  cargo?: string;
  resumo?: string;
  descricao?: string;
  requisitos?: string;
  data_publicacao?: number;
  data_encerramente?: number;
  status?: vagasStatus;
  como_se_inscrever?: string;
  tipo_vinculo?: vagasVinculo;
};
