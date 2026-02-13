import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PageCancelamentoCorretor } from './page-cancelamento-corretor/page-cancelamento-corretor.component';
import { CancelamentoCorretorRoutingModule } from './cancelamento-corretor.routing';
import { BlockCancelarPropostaComponent } from './block-cancelar-proposta/block-cancelar-proposta.component';
import { BlockCancelamentoIndisponivelComponent } from './block-cancelamento-indisponivel/block-cancelamento-indisponivel.component';

@NgModule({
  declarations: [PageCancelamentoCorretor, BlockCancelarPropostaComponent, BlockCancelamentoIndisponivelComponent],
  imports: [CommonModule, CancelamentoCorretorRoutingModule, SharedModule],
})
export class CancelamentoCorretorModule {}
