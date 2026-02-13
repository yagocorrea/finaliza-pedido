import { StatusPerfilPagamento } from '../enum';

export interface RetornoFaturaProposta {
  idProposta: number;
  idParceiro: number;
  cicloPagamento: number;
  formaPagamento: number;
  statusPerfilPagamento: StatusPerfilPagamento;
  linkFatura: string;
  linkBoleto: string | null;
  pixTempoExpiracao: number; //minutos
  pixTempoExpiracaoTotal: number; //minutos
  pixCodigo: string | null;
  pixBase64: string | null;
  erros: string[];
}
