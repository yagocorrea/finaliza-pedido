import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEscolhaTempoCarenciaComponent } from './page-escolha-tempo-carencia/page-escolha-tempo-carencia.component';


export const routes: Routes = [

  {
    path: '',
    component: PageEscolhaTempoCarenciaComponent,
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

export class EscolhaTempoCarenciaRoutingModule {};
