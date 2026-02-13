import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEscolhaTempoCarenciaComponent } from './page-escolha-tempo-carencia/page-escolha-tempo-carencia.component';
import { EscolhaTempoCarenciaRoutingModule } from './escolha-tempo-carencia.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlockCardsPlanosComponent } from './block-cards-planos/block-cards-planos.component';
import { BlockTabelaCarenciasComponent } from './block-tabela-carencias/block-tabela-carencias.component';
import { TabelaPeriodoCarenciaModule } from './block-tabela-carencias/tabela-periodo-carencia/tabela-periodo-carencia.module';
import { CustomTabelaPeriodoCarenciaModule } from './block-tabela-carencias/custom-tabela-periodo-carencia/custom-tabela-periodo-carencia.module';

@NgModule({
  declarations: [
    PageEscolhaTempoCarenciaComponent,
    BlockTabelaCarenciasComponent,
  ],
  imports: [
    CommonModule,
    TabelaPeriodoCarenciaModule,
    EscolhaTempoCarenciaRoutingModule,
    SharedModule,
    BlockCardsPlanosComponent,
    CustomTabelaPeriodoCarenciaModule
  ],
})
export class EscolhaTempoCarenciaModule {}
