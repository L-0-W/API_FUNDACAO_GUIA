import {
  evento,
  exame,
  noticia_DTO,
  referencias,
  setor,
  vagasEmprego,
  bloco,
} from "./entidades";

export type localizacaoAPIretorno = {
  exames?: exame[];
  setor?: setor[];
  bloco?: bloco[];
  andar?: string;
  coordenada?: string;
  referencias?: referencias;
};

export type eventosAPIretorno = {
  eventos?: evento[];
};

export type noticiaAPIretorno = {
  noticias?: noticia_DTO[];
};

export type vagasAPIretorno = {
  vagas?: vagasEmprego[];
};

export type apiRetorno<T> = {
  codigoStatus?: number;
  mensagem?: string;
  existe?: boolean;
  total?: number;
  body?: T;
};
