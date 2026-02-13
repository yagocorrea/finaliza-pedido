import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEscolhaFormaPagamentoComponent } from './page-escolha-forma-pagamento/page-escolha-forma-pagamento.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EscolhaFormaPagamentoRoutingModule } from './escolha-forma-pagamento.routing';
import { BlockCardsFormaPgtoComponent } from './block-cards-forma-pgto/block-cards-forma-pgto.component';
import { BlockFormaPagamentoPix } from './block-pagamento-pix/block-pagamento-pix.component';
import { BlockFormaPagamentoBoleto } from './block-pagamento-boleto/block-pagamento-boleto.component';
import { BlockFormaPagamentoCartao } from './block-pagamento-cartao/block-pagamento-cartao.component';
import { CustomValidatorDirective } from 'src/app/shared/core/utils/custom-validator/custom-validator.directive';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BrandDetectorDirective } from 'src/app/shared/core/utils/brand-detector/brand-detector.directive';

@NgModule({
  declarations: [
    PageEscolhaFormaPagamentoComponent,
    BlockCardsFormaPgtoComponent,
    BlockFormaPagamentoPix,
    BlockFormaPagamentoBoleto,
    BlockFormaPagamentoCartao,
    CustomValidatorDirective,
    BrandDetectorDirective,
  ],
  imports: [
    CommonModule,
    EscolhaFormaPagamentoRoutingModule,
    SharedModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
})
export class EscolhaFormaPagamentoModule {}
