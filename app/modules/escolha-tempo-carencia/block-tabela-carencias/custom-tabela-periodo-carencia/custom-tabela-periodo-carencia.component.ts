import { Component, Input, ViewEncapsulation } from '@angular/core';
import { custom } from 'src/customizacao/custom';

@Component({
    selector: 'app-custom-tabela-periodo-carencia',
    templateUrl: './custom-tabela-periodo-carencia.component.html',
    styleUrls: ['custom-tabela-periodo-carencia.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class CustomTabelaPeriodoCarenciaComponent {
  linha: string = custom.sistema.nome;
}
