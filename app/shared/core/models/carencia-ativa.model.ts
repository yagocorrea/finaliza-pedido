export interface CarenciaAtiva {
  valor: number;
  nome: string;
  termoPgto: string;
  carencia: string;
  isCarenciaZero: boolean;
  total: number; // Isso é utilizado para calcular o valor total da proposta nesta carencia
  percentualDesconto: number; // Isso é utilizado para informar o valor de desconto na proposta nesta carencia
}
