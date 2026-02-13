import { ItemProcedimento } from './item-procedimento.model';

export interface ItemCarencia {
  periodo: string;
  destaque: boolean;
  procedimentos: ItemProcedimento[];
}
