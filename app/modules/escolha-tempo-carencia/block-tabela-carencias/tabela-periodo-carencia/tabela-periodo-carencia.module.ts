import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TabelaPeriodoCarenciaComponent } from './tabela-periodo-carencia.component';
import { TabelaProcedimentosComponent } from './tabela-procedimentos/tabela-procedimentos.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TabelaPeriodoCarenciaComponent, TabelaProcedimentosComponent],
  exports: [TabelaPeriodoCarenciaComponent],
})
export class TabelaPeriodoCarenciaModule {}
