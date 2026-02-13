import { Component, DoCheck, Input, OnInit } from '@angular/core';

import { custom } from 'src/customizacao/custom';
import { FormaPagamentoRegras, RouterEnum, StorageEnum } from '../../core/enum';
import { CarenciaAtiva, Produto, Proposta } from '../../core/models';

import { StorageService } from '../../core/services/storage/storage.service';
import { RouterService } from '../../core/services/router/router.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ToastService } from '../../core/services/toast/toast.service';
import { PropostaService } from '../../core/services/api/proposta/proposta.service';

@Component({
    selector: 'app-block-resumo-compra',
    templateUrl: './block-resumo-compra.component.html',
    styleUrls: ['./block-resumo-compra.component.scss'],
    standalone: false
})
export class BlockResumoCompraComponent implements DoCheck {
  _carenciaSelecionada: CarenciaAtiva | undefined = undefined;

  proposta: Proposta | null = null;
  taxa: Produto | null = null;
  cicloPagamento: number | null = null;

  @Input() formaPagamento: FormaPagamentoRegras | undefined;
  @Input() isPaginaPix: boolean = false;
  constructor(
    private propostaService: PropostaService,
    private storageService: StorageService,
    private routerService: RouterService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toast: ToastService
  ) {}

  ngDoCheck() {
    this.proposta = this.storageService.getData<Proposta>(StorageEnum.Proposta);
    this.cicloPagamento = this.storageService.getData<number>(
      StorageEnum.CicloPagamento
    );
    if (!this.cicloPagamento && this.proposta) {
      this.cicloPagamento = this.proposta.cicloPagamento;
    }
    this.taxa = this.storageService.getData<Produto>(StorageEnum.TxBancaria);

    if (this.cicloPagamento) {
      this._carenciaSelecionada = custom.sistema.carenciasAtivas.find(
        (el) => el.valor === this.cicloPagamento
      );
    }
  }

  trocaCarenciaIsHidden() {
    return custom.sistema.carenciasAtivas.length <= 1;
  }

  getCarenciaSelecionada = () => this._carenciaSelecionada;

  getCicloPagamentoTexto() {
    if (this._carenciaSelecionada) {
      return `Plano ${this._carenciaSelecionada.carencia} • ${this._carenciaSelecionada.nome}`;
    }

    return '';
  }

  getListaDescontos() {
    if (this.proposta) {
      switch (this.formaPagamento) {
        case FormaPagamentoRegras.BOLETO:
          return this.proposta.listaDescontoBoleto;

        case FormaPagamentoRegras.PIX:
          return this.proposta.listaDescontoPix;

        case FormaPagamentoRegras.CARTAO:
          return this.proposta.listaDescontoCartao;

        default:
          return [];
      }
    }
    return [];
  }

  isPix() {
    return this.formaPagamento === FormaPagamentoRegras.PIX;
  }

  isCartao() {
    return this.formaPagamento === FormaPagamentoRegras.CARTAO;
  }

  isBoleto() {
    return this.formaPagamento === FormaPagamentoRegras.BOLETO;
  }

  getValorProposta() {
    if (this.proposta) {
      return this.proposta.produtoValor * this.proposta.totalSegurados;
    }
    return 0;
  }

  trocarCarencia() {
    if (this.isPaginaPix && this.proposta) {
      this.recaptchaV3Service.execute('submit').subscribe((token) => {
        this.propostaService
          .ReiniciarStatusProposta({
            propostaUid: this.proposta!.uid,
            responseKey: token,
          })
          .subscribe({
            next: (value) => {
              this.routerService.goTo(RouterEnum.ESCOLHA_TEMPO_CARENCIA);
            },
            error: (err) => {
              const msg = err.error.errors ?? err.error;
              this.toast.Error(msg);
            },
          });
      });
    } else if (this.proposta) {
      this.routerService.goTo(RouterEnum.ESCOLHA_TEMPO_CARENCIA);
      window.scroll(0, 0);
    } else {
      this.toast.Warning('Não foi possível buscar a proposta.');
    }
  }
}
