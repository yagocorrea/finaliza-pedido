import { Component, DoCheck } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/shared/component/loading/loading.service';
import {
  FormaPagamentoRegras,
  RouterEnum,
  StorageEnum,
} from 'src/app/shared/core/enum';
import {
  Proposta,
  RetornoFaturaProposta,
  Response,
} from 'src/app/shared/core/models';
import { PropostaService } from 'src/app/shared/core/services/api/proposta/proposta.service';
import { RouterService } from 'src/app/shared/core/services/router/router.service';
import { StorageService } from 'src/app/shared/core/services/storage/storage.service';
import { ToastService } from 'src/app/shared/core/services/toast/toast.service';
import { custom } from 'src/customizacao/custom';

@Component({
    selector: 'app-block-pagamento-boleto',
    templateUrl: './block-pagamento-boleto.component.html',
    styleUrls: ['./block-pagamento-boleto.component.scss'],
    standalone: false
})
export class BlockFormaPagamentoBoleto implements DoCheck {
  custom = custom;
  time = new Date().getTime();

  recaptchaChecked: boolean = false;
  carenciaChecked: boolean = false;
  cicloPagamento: number | null = null;
  proposta: Proposta | null = null;
  disableSendButton: boolean = false;

  constructor(
    private storageService: StorageService,
    private propostaService: PropostaService,
    private routerService: RouterService,
    private toast: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private loadingService: LoadingService
  ) {}

  ngDoCheck(): void {
    this.proposta = this.storageService.getData(StorageEnum.Proposta);
    this.cicloPagamento = this.storageService.getData(
      StorageEnum.CicloPagamento
    );
    if (!this.cicloPagamento && this.proposta) {
      this.cicloPagamento = this.proposta.cicloPagamento;
    }
    this.carenciaChecked = !!this.cicloPagamento;
  }

  onSave(value: Response<RetornoFaturaProposta>, storage: StorageService) {
    if (value.success) {
      storage.saveData(StorageEnum.FormaPgto, FormaPagamentoRegras.BOLETO);
      storage.saveData(StorageEnum.RetornoFaturaProposta, value.data);
      this.proposta!.statusProposta = 6;
      storage.saveData(StorageEnum.Proposta, this.proposta!);
      this.routerService.goTo(RouterEnum.CONCLUSAO);
    } else {
      this.toast.Warning(
        'Não foi possível concluir a proposta na modalidade Boleto. Clique no botão abaixo e tente novamente mais tarde.'
      );
    }
  }

  setRecaptchaChecked(value: string) {
    this.recaptchaChecked = !!value;
  }

  FinalizaPedido() {
    this.disableSendButton = true;
    this.recaptchaV3Service.execute('submit').pipe(
      finalize(() => {
        this.disableSendButton = false;
        this.loadingService.setMessage(null);
      }))
      .subscribe((token) => {
      if (this.cicloPagamento && this.proposta && token) {
        this.propostaService
          .FinalizarPedido({
            idParceiro: 4,
            cicloPagamento: this.cicloPagamento,
            formaPagamento: FormaPagamentoRegras.BOLETO,
            idProposta: this.proposta.id,
          })
          .subscribe({
            next: (value) => {
              this.onSave(value, this.storageService);
            },
            error: (err) => {
              const msg = err.error.errors ?? err.error;
              this.toast.Error(msg);
            },
          });
      } else if (!this.proposta) {
        this.toast.Warning(
          'Não foi possível concluir a proposta na modalidade Boleto: A proposta não foi encontrada'
        );
      } else if (!this.cicloPagamento) {
        this.toast.Warning(
          'Não foi possível concluir a proposta na modalidade Boleto: A carência não foi selecionada'
        );
      } else {
        this.toast.Warning('Não foi possível buscar o reCaptcha token');
      }
    });
  }

  ngOnDestroy(): void {}
}
