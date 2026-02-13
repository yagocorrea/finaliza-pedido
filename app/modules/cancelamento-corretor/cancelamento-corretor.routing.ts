import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCancelamentoCorretor } from './page-cancelamento-corretor/page-cancelamento-corretor.component';



export const routes: Routes = [

  {
    path: '',
    component: PageCancelamentoCorretor,
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

export class CancelamentoCorretorRoutingModule {};
