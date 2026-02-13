import { Component, DoCheck, OnInit } from '@angular/core';
import { custom } from 'src/customizacao/custom';
import { CurrencyPipe } from '@angular/common';
import { StorageService } from '../../core/services/storage/storage.service';
import { StorageEnum } from '../../core/enum';
import { Proposta } from '../../core/models';

@Component({
    imports: [CurrencyPipe],
    selector: 'app-block-resumo-vida-valor',
    templateUrl: './block-resumo-vida-valor.component.html',
    styleUrls: ['./block-resumo-vida-valor.component.scss']
})
export class BlockResumoVidaValorComponent implements DoCheck {
  custom = custom;
  totalTitulares = 1;
  totalDependentes = 0;
  totalCadastrados = 0;
  isAberto = false;

  valorPlanoMes = 0;

  constructor(private storageService: StorageService) {}
  ngDoCheck() {
    const proposta = this.storageService.getData<Proposta>(
      StorageEnum.Proposta
    );

    if (proposta) {
      this.totalCadastrados = proposta.totalSegurados;

      this.totalDependentes = proposta.totalSegurados - 1;

      this.valorPlanoMes = proposta.produtoValor;
    }
  }

  setIsAberto(v: boolean) {
    this.isAberto = v;
  }
}
