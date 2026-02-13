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
  CarenciaAtiva,
} from 'src/app/shared/core/models';
import { PropostaService } from 'src/app/shared/core/services/api/proposta/proposta.service';
import { RouterService } from 'src/app/shared/core/services/router/router.service';
import { StorageService } from 'src/app/shared/core/services/storage/storage.service';
import { ToastService } from 'src/app/shared/core/services/toast/toast.service';
import { custom } from 'src/customizacao/custom';

@Component({
    selector: 'app-block-pagamento-pix',
    templateUrl: './block-pagamento-pix.component.html',
    styleUrls: ['./block-pagamento-pix.component.scss'],
    standalone: false
})
export class BlockFormaPagamentoPix implements DoCheck {
  custom = custom;
  time = new Date().getTime();

  _termoPgto = 'mensalidade';
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
    if (this.cicloPagamento) {
      const carenciaAtiva: CarenciaAtiva | undefined =
        custom.sistema.carenciasAtivas.find(
          (el) => el.valor === this.cicloPagamento
        );
      if (carenciaAtiva) {
        this._termoPgto = carenciaAtiva.termoPgto.toLocaleLowerCase();
      }
    }
  }

  getTermoPgto = () => this._termoPgto.toLocaleLowerCase();

  setRecaptchaChecked(value: string) {
    this.recaptchaChecked = !!value;
  }

  onSave(value: Response<RetornoFaturaProposta>, storage: StorageService) {
    if (value.success && (value.data.linkBoleto || value.data.pixCodigo)) {
      storage.saveData(StorageEnum.FormaPgto, FormaPagamentoRegras.PIX);
      storage.saveData(StorageEnum.RetornoFaturaProposta, value.data);
      this.proposta!.statusProposta = 6;
      storage.saveData(StorageEnum.Proposta, this.proposta!);
      this.routerService.goTo(RouterEnum.FINALIZA_PGTO);
    } else {
      this.toast.Warning(
        'Não foi possível concluir a proposta na modalidade Pix. Clique no botão abaixo e tente novamente mais tarde.'
      );
    }
  }

  FinalizaPedido() {
    this.disableSendButton = true;
    this.recaptchaV3Service.execute('submit').pipe(
      finalize(() => {
        this.loadingService.setMessage(null);
        this.disableSendButton = false;
      }))
      .subscribe((token) => {
      if (this.cicloPagamento && this.proposta && token) {
        this.propostaService
          .FinalizarPedido({
            idParceiro: 4,
            cicloPagamento: this.cicloPagamento,
            formaPagamento: FormaPagamentoRegras.PIX,
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
          'Não foi possível concluir a proposta na modalidade Pix: A proposta não foi encontrada'
        );
      } else if (!this.cicloPagamento) {
        this.toast.Warning(
          'Não foi possível concluir a proposta na modalidade Pix: A carência não foi selecionada'
        );
      } else {
        this.toast.Warning('Não foi possível buscar o reCaptcha token');
      }
    });
  }
}
