import { Component, Input } from '@angular/core';
import { FormaPagamentoRegras } from 'src/app/shared/core/enum';
import { CarenciaAtiva, Desconto } from 'src/app/shared/core/models';

@Component({
    selector: 'app-card-resumo-valor',
    templateUrl: './card-resumo-valor.component.html',
    styleUrls: ['./card-resumo-valor.component.scss'],
    standalone: false
})
export class CardResumoValorComponent {
  @Input() formaPagamento: FormaPagamentoRegras | undefined;
  @Input() carenciaSelecionada: CarenciaAtiva | undefined;
  @Input() valorTaxa: number | undefined;
  @Input() produtoValor: number | undefined;
  @Input() totalSegurados: number | undefined;
  @Input() cicloPagamento: number | null | undefined;
  @Input() listaDescontos!: Desconto[];

  mensagens = {
    primeira: {
      simples: '(1ª $0)',
      plural: '(até a $0ª $1)',
    },

    segunda: {
      simples: '*Válido apenas para a 1ª $0',
      plural: '*Válido até a $0ª $1',
    },
  };

  getDescontoMeses = () => {
    const desconto = this.listaDescontos.find(
      (el) => el.ciclo === this.cicloPagamento
    );
    if (desconto) {
      return desconto.parcelas;
    }
    return 0;
  };

  getTermoPgto = () =>
    this.carenciaSelecionada?.termoPgto.toLocaleLowerCase() || 'mensalidade';

  getTextoDescontoMensalidades(texto: { simples: string; plural: string }) {
    const descontoMeses = this.getDescontoMeses();
    if (descontoMeses === 1) {
      return texto.simples.replaceAll('$0', this.getTermoPgto());
    } else if (descontoMeses > 1) {
      return texto.plural
        .replaceAll('$0', descontoMeses.toString())
        .replaceAll('$1', this.getTermoPgto());
    }
    return '';
  }

  getCicloPercentualDesconto() {
    if (this.cicloPagamento) {
      const desconto = this.listaDescontos.find(
        (el) => el.ciclo === this.cicloPagamento
      );

      if (desconto) {
        return desconto.percentualDesconto;
      }
    }
    return 0;
  }

  getCicloPagamentoDesconto() {
    if (this.cicloPagamento) {
      const desconto = this.listaDescontos.find(
        (el) => el.ciclo === this.cicloPagamento
      );

      if (desconto) {
        if(this.totalSegurados)
          return desconto.valorDesconto * this.totalSegurados;
        else
          return desconto.valorDesconto;
      }
    }
    return 0;
  }

  getValorProposta() {
    if (this.produtoValor && this.totalSegurados) {
      return this.produtoValor * this.totalSegurados;
    }
    return 0;
  }

  getTitulo() {
    const nomeFormaPgto = this.getNomeFormaPgto();

    if (this.getCicloPercentualDesconto()) {
      return (
        this.getTextoDescontoMensalidades(this.mensagens.primeira) +
        ' - ' +
        nomeFormaPgto
      );
    }

    if (this.isCartao()) {
      return 'Mensalidade recorrente';
    }

    return `Todo mês receba 1 ${nomeFormaPgto} com a sua mensalidade`;
  }

  getValorTotal(desconto: boolean) {
    if (
      this.produtoValor &&
      this.totalSegurados &&
      this.cicloPagamento &&
      this.valorTaxa !== undefined
    ) {
      if (desconto) {
        return (
          this.getValorProposta() * this.cicloPagamento -
          this.getCicloPagamentoDesconto() +
          this.valorTaxa
        );
      } else {
        return this.getValorProposta() * this.cicloPagamento + this.valorTaxa;
      }
    }
    return 0;
  }

  getNomeFormaPgto() {
    switch (this.formaPagamento) {
      case FormaPagamentoRegras.PIX:
        return 'Pix';

      case FormaPagamentoRegras.CARTAO:
        return 'Cartão';

      case FormaPagamentoRegras.BOLETO:
        return 'Boleto';

      default:
        return '';
    }
  }

  isCartao() {
    return this.formaPagamento === FormaPagamentoRegras.CARTAO;
  }
}
