import { Component, Input } from '@angular/core';
import { ItemProcedimento } from 'src/app/shared/core/models';

@Component({
    selector: 'app-tabela-procedimentos',
    templateUrl: './tabela-procedimentos.component.html',
    styleUrls: ['./tabela-procedimentos.component.scss'],
    standalone: false
})
export class TabelaProcedimentosComponent {
  @Input() procedimentos: ItemProcedimento[] = [];
  @Input() destaque: boolean = false;

  isBottomZero = (p: ItemProcedimento) =>
    p.nome !== this.procedimentos[this.procedimentos.length - 1].nome &&
    this.destaque;
}
