import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagePropostaConcluidaComponent } from './page-proposta-concluida/page-proposta-concluida.component';

export const routes: Routes = [
  {
    path: '',
    component: PagePropostaConcluidaComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropostaConcluidaRoutingModule {}
