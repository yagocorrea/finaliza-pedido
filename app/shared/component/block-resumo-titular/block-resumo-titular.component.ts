import { Component, DoCheck, OnInit } from '@angular/core';
import { custom } from 'src/customizacao/custom';
import { CurrencyPipe } from '@angular/common';
import { StorageService } from '../../core/services/storage/storage.service';
import { StorageEnum } from '../../core/enum';
import { Proposta } from '../../core/models';

@Component({
  standalone: true,
  selector: 'app-block-resumo-titular',
  templateUrl: './block-resumo-titular.component.html',
  styleUrl: './block-resumo-titular.component.scss'
})
export class BlockResumoTitularComponent {
  custom = custom;
  Titular = 'string';
  totalDependentes = 0;
  totalCadastrados = 0;

  constructor(private storageService: StorageService) {}
  ngDoCheck() {
    const proposta = this.storageService.getData<Proposta>(
      StorageEnum.Proposta
    );

    if (proposta) {
      this.totalCadastrados = proposta.totalSegurados;
      this.totalDependentes = proposta.totalSegurados - 1;
      this.Titular = proposta.nomeContratante;
    }
  }
}
