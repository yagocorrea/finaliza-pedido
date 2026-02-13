import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { FinalizeSeuPagamentoRoutingModule } from './finalize-seu-pagamento.routing';
import { PageFinalizeSeuPagamentoComponent } from './page-finalize-seu-pagamento/page-finalize-seu-pagamento.component';

@NgModule({
  declarations: [PageFinalizeSeuPagamentoComponent],
  imports: [CommonModule, FinalizeSeuPagamentoRoutingModule, SharedModule],
})
export class FinalizeSeuPagamentoModule {}
