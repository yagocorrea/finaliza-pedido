import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NaoEncontradoRoutingModule } from './nao-encontrado.routing';

import { PageNaoEncontradoComponent } from './page-nao-encontrado/page-nao-encontrado.component';

@NgModule({
  declarations: [PageNaoEncontradoComponent],
  imports: [CommonModule, NaoEncontradoRoutingModule, SharedModule],
  providers: [],
})
export class NaoEncontradoModule {}
