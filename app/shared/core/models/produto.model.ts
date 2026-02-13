export interface Produto {
  id: number;
  uid: string;
  idProdutoParceiro: number | null;
  nome: string;
  descricao: string;
  textoDestaque: string | null;
  textoDetalhe: string | null;
  cobertura: string | null;
  tipoCobertura: string | null;
  valor: number;
  tipoProduto: number;
}
