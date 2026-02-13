import { CartaoCredito } from './cartao-credito.model';

export interface FaturaProposta {
  idProposta: number;
  idParceiro: number;
  cicloPagamento: number;
  formaPagamento: number;
  hashPagamentoCartao?: string;
  cartao?: CartaoCredito;
}
