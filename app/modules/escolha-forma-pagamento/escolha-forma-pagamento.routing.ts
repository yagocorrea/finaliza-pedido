import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEscolhaFormaPagamentoComponent } from './page-escolha-forma-pagamento/page-escolha-forma-pagamento.component';


export const routes: Routes = [

  {
    path: '',
    component: PageEscolhaFormaPagamentoComponent,
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

export class EscolhaFormaPagamentoRoutingModule {};
