import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageFinalizeSeuPagamentoComponent } from './page-finalize-seu-pagamento/page-finalize-seu-pagamento.component';



export const routes: Routes = [

  {
    path: '',
    component: PageFinalizeSeuPagamentoComponent,
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class FinalizeSeuPagamentoRoutingModule {};
