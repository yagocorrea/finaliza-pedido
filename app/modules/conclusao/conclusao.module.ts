import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageConclusaoComponent } from './page-conclusao/page-conclusao.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConclusaoRoutingModule } from './conclusao.routing';



@NgModule({
  declarations: [
    PageConclusaoComponent
  ],
  imports: [
    CommonModule,
    ConclusaoRoutingModule,
    SharedModule,
  ]
})

export class ConclusaoModule { }
