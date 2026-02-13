import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageConclusaoComponent } from './page-conclusao/page-conclusao.component';



export const routes: Routes = [

  {
    path: '',
    component: PageConclusaoComponent,
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

export class ConclusaoRoutingModule {};
