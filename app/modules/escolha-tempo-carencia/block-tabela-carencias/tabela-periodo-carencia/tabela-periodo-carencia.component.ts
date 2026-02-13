import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ItemCarencia } from 'src/app/shared/core/models';

@Component({
    selector: 'app-tabela-periodo-carencia',
    templateUrl: './tabela-periodo-carencia.component.html',
    styleUrls: ['tabela-periodo-carencia.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class TabelaPeriodoCarenciaComponent {
  @Input() carencias: ItemCarencia[] = [];
}
