import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { FormaPagamentoRegras, StorageEnum } from 'src/app/shared/core/enum';
import { CarenciaAtiva, Proposta } from 'src/app/shared/core/models';
import { StorageService } from 'src/app/shared/core/services/storage/storage.service';
import { custom } from 'src/customizacao/custom';

@Component({
    selector: 'app-block-cards-forma-pgto',
    templateUrl: './block-cards-forma-pgto.component.html',
    styleUrls: ['./block-cards-forma-pgto.component.scss'],
    standalone: false
})
export class BlockCardsFormaPgtoComponent implements DoCheck {
  _mesesDescontoPix = 0;
  _termoPgto = 'mensalidade';

  percentualEscolhido = {
    cartao: 0,
    boleto: 0,
    pix: 0,
  };

  @Input() formaPagamento: FormaPagamentoRegras | undefined;
  @Output() setFormaPagamentoEmitter = new EventEmitter<FormaPagamentoRegras>();

  constructor(private storageService: StorageService) {}

  ngDoCheck(): void {
    const proposta = this.storageService.getData<Proposta>(
      StorageEnum.Proposta
    );
    let cp = this.storageService.getData<number>(StorageEnum.CicloPagamento);
    if (!cp && proposta) {
      cp = proposta.cicloPagamento;
    }

    if (cp) {
      const carenciaAtiva: CarenciaAtiva | undefined =
        custom.sistema.carenciasAtivas.find((el) => el.valor === cp);
      if (carenciaAtiva) {
        this._termoPgto = carenciaAtiva.termoPgto.toLocaleLowerCase();
      }
    }

    if (proposta && cp) {
      const desconto = proposta.listaDescontoPix.find((el) => el.ciclo === cp);
      const descontoBoleto = proposta.listaDescontoBoleto.find(
        (el) => el.ciclo === cp
      );
      const descontoCartao = proposta.listaDescontoCartao.find(
        (el) => el.ciclo === cp
      );
      if (desconto) {
        this.percentualEscolhido.pix = desconto.percentualDesconto;
        this._mesesDescontoPix = desconto.parcelas;
      }
      if (descontoCartao) {
        this.percentualEscolhido.cartao = descontoCartao.percentualDesconto;
      }
      if (descontoBoleto) {
        this.percentualEscolhido.boleto = descontoBoleto.percentualDesconto;
      }
    }
  }

  setFormaPagamentoPix() {
    this.setFormaPagamentoEmitter.emit(FormaPagamentoRegras.PIX);
  }

  setFormaPagamentoCartao() {
    this.setFormaPagamentoEmitter.emit(FormaPagamentoRegras.CARTAO);
  }

  setFormaPagamentoBoleto() {
    this.setFormaPagamentoEmitter.emit(FormaPagamentoRegras.BOLETO);
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
}
