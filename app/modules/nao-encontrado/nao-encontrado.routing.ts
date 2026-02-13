import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNaoEncontradoComponent } from './page-nao-encontrado/page-nao-encontrado.component';

export const routes: Routes = [
  {
    path: '',
    component: PageNaoEncontradoComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NaoEncontradoRoutingModule {}
