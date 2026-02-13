import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErroRoutingModule } from './erro.routing';

import { PageErroComponent } from './page-erro/page-erro.component';

@NgModule({
  declarations: [PageErroComponent],
  imports: [CommonModule, ErroRoutingModule, SharedModule],
  providers: [],
})
export class ErroModule {}
