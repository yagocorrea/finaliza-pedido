import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PropostaConcluidaRoutingModule } from './proposta-concluida.routing';

import { PagePropostaConcluidaComponent } from './page-proposta-concluida/page-proposta-concluida.component';

@NgModule({
  declarations: [PagePropostaConcluidaComponent],
  imports: [CommonModule, PropostaConcluidaRoutingModule, SharedModule],
  providers: [],
})
export class PropostaConcluidaModule {}
