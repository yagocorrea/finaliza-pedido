import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  Component,
  DoCheck,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { StorageEnum } from 'src/app/shared/core/enum';
import { CarenciaAtiva, Produto, Proposta } from 'src/app/shared/core/models';
import { StorageService } from 'src/app/shared/core/services/storage/storage.service';
import { custom } from 'src/customizacao/custom';

@Component({
    imports: [CurrencyPipe, CommonModule],
    selector: 'app-block-cards-planos',
    templateUrl: './block-cards-planos.component.html',
    styleUrls: ['./block-cards-planos.component.scss']
})
export class BlockCardsPlanosComponent implements DoCheck {
  carencias: CarenciaAtiva[] = custom.sistema.carenciasAtivas;

  cicloPagamento: number = -1;

  @Output() setCicloPagamentoEmitter = new EventEmitter<number>();

  constructor(private storageService: StorageService) {}

  ngDoCheck() {
    const proposta = this.storageService.getData<Proposta>(
      StorageEnum.Proposta
    );
    const taxa = this.storageService.getData<Produto>(StorageEnum.TxBancaria);
    const cp = this.storageService.getData<number>(StorageEnum.CicloPagamento);
    if (cp) {
      this.cicloPagamento = cp;
    } else if (proposta) {
      this.cicloPagamento = proposta.cicloPagamento;
    }
    if (proposta && taxa) {
      this.carencias = this.carencias.map((el) => {
        el.total = proposta.produtoValor * el.valor * proposta.totalSegurados;
        const desconto = proposta.listaDescontoPix.find(
          (desc) => desc.ciclo === el.valor
        );
        if (desconto) {
          el.total -= desconto.valorDesconto;
          el.percentualDesconto = desconto.percentualDesconto;
        }
        el.total += taxa.valor;
        return el;
      });
    }
  }

  setCicloPagamento(valor: number) {
    this.cicloPagamento = valor;
    this.storageService.saveData(StorageEnum.CicloPagamento, valor);
    this.setCicloPagamentoEmitter.emit(valor);
  }
}
