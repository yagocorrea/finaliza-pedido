import { Desconto } from './desconto.model';

export interface Proposta {
  id: number;
  uid: string;
  numeroProposta: string;
  valor: number;
  produtoValor: number;
  dataVigencia: string;
  uf: string;
  idCorretor: number;
  nomeCorretor: string;
  idContratante: number;
  nomeContratante: string;
  totalSegurados: number;
  nomePlano: string;
  idPlano: number;
  possuiPerfilPagamento: boolean;
  statusProposta: number;
  listaDescontoPix: Desconto[];
  listaDescontoBoleto: Desconto[];
  listaDescontoCartao: Desconto[];
  cicloPagamento: number;
}
