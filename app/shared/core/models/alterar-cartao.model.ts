import { CartaoCredito } from './cartao-credito.model';

export interface AlterarCartao {
  cartao: CartaoCredito;
  idProposta: number;
  idParceiro: number;
}
