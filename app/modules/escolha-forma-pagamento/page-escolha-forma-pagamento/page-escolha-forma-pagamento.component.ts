import { Component, DoCheck, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormaPagamentoRegras,
  RouterEnum,
  StorageEnum,
} from 'src/app/shared/core/enum';
import { Corretor, Proposta } from 'src/app/shared/core/models';
import { PropostaService } from 'src/app/shared/core/services/api/proposta/proposta.service';
import { RouterService } from 'src/app/shared/core/services/router/router.service';
import { StorageService } from 'src/app/shared/core/services/storage/storage.service';
import { custom } from 'src/customizacao/custom';

@Component({
    selector: 'app-page-escolha-forma-pagamento',
    templateUrl: './page-escolha-forma-pagamento.component.html',
    styleUrls: ['./page-escolha-forma-pagamento.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class PageEscolhaFormaPagamentoComponent implements DoCheck {
  FormaPagamentoRegras = FormaPagamentoRegras;
  formaPagamento: FormaPagamentoRegras | undefined;
  proposta: Proposta | null = null;
  cardAutoSetted: boolean = false;
  propostaReativada: string | null = this.storageService.getData(StorageEnum.PropostaReativada);

  custom = custom;
  time = new Date().getTime();
  btnEnviarLinkHabilitado = false;

  constructor(
    private storageService: StorageService,
    private routerService: RouterService
  ) {}

  ngDoCheck(): void {
    this.proposta = this.storageService.getData<Proposta>(StorageEnum.Proposta);
    if(!this.cardAutoSetted && this.proposta && this.proposta?.statusProposta === 2 && !this.propostaReativada) {
      this.setFormaPagamento(FormaPagamentoRegras.CARTAO);
      this.cardAutoSetted = true;
    }
    const corretor = this.storageService.getData<Corretor>(
      StorageEnum.Corretor
    );
    if (
      corretor &&
      corretor.cpf !== '16844872771' &&
      this.routerService.getVisaoCorretor()
    ) {
      this.btnEnviarLinkHabilitado = true;
    }
  }

  setFormaPagamento(valor: FormaPagamentoRegras) {
    this.formaPagamento = valor;
  }

  backHandler() {
    this.routerService.goTo(RouterEnum.ESCOLHA_TEMPO_CARENCIA);
  }
}
