import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PageReativarPropostaComponent } from "./page-reativar-proposta/page-reativar-proposta.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ReativarPropostaRoutingModule } from "./reativar-proposta.routing";

@NgModule({
  imports: [CommonModule, SharedModule, ReativarPropostaRoutingModule],
  declarations: [PageReativarPropostaComponent]
})
export class ReativarPropostaModule {}
