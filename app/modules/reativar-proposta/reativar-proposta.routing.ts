import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageReativarPropostaComponent } from './page-reativar-proposta/page-reativar-proposta.component';

export const routes: Routes = [
  {
    path: '',
    component: PageReativarPropostaComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReativarPropostaRoutingModule {}
