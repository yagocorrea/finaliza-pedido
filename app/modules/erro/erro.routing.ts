import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageErroComponent } from './page-erro/page-erro.component';

export const routes: Routes = [
  {
    path: '',
    component: PageErroComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErroRoutingModule {}
