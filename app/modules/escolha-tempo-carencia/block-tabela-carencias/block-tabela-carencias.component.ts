import { Component } from '@angular/core';
import { custom } from 'src/customizacao/custom';

@Component({
    selector: 'app-block-tabela-carencias',
    templateUrl: './block-tabela-carencias.component.html',
    styleUrls: ['./block-tabela-carencias.component.scss'],
    standalone: false
})
export class BlockTabelaCarenciasComponent {
  custom = custom;
  tabelaAberta: boolean = false;

  carenciaNormal = custom.sistema.tabela.normal;
  observacoes = custom.sistema.tabela.obs;
  tabelaCustom: boolean = custom.sistema.tabela?.custom ?? false;

  ngOnInit() {

  }
}
