import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/shared/component/loading/loading.service';

import {
  FormaPagamentoRegras,
  RouterEnum,
  StatusPerfilPagamento,
  StorageEnum,
} from 'src/app/shared/core/enum';
import {
  Proposta,
  RetornoFaturaProposta,
  Response,
  CartaoCredito,
  BandeiraCartaoOption,
} from 'src/app/shared/core/models';
import { PropostaService } from 'src/app/shared/core/services/api/proposta/proposta.service';
import { RouterService } from 'src/app/shared/core/services/router/router.service';

import { StorageService } from 'src/app/shared/core/services/storage/storage.service';
import { ToastService } from 'src/app/shared/core/services/toast/toast.service';
import { BrandDetectorDirective } from 'src/app/shared/core/utils/brand-detector/brand-detector.directive';
import { CustomValidatorDirective } from 'src/app/shared/core/utils/custom-validator/custom-validator.directive';

import { custom } from 'src/customizacao/custom';

@Component({
    selector: 'app-block-pagamento-cartao',
    templateUrl: './block-pagamento-cartao.component.html',
    styleUrls: ['./block-pagamento-cartao.component.scss'],
    standalone: false
})
export class BlockFormaPagamentoCartao implements DoCheck, OnInit {
  custom = custom;

  formCartao = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      CustomValidatorDirective.nomeCartao,
    ]),
    numeroCartao: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      CustomValidatorDirective.numeroCartaoCretito,
      CustomValidatorDirective.sameNumbers,
    ]),
    codigoSeguranca: new FormControl('', [
      Validators.required,
      CustomValidatorDirective.cvvCartao,
      CustomValidatorDirective.allZeroNumbers
    ]),
    dataValidade: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      CustomValidatorDirective.validadeCartao,
    ]),
    bandeira: new FormControl('', [Validators.required]),
  });
  recaptchaChecked: boolean = false;
  carenciaChecked: boolean = false;

  showOptions: boolean = false;

  cicloPagamento: number | null = null;
  proposta: Proposta | null = null;

  flipCartao = false;
  time = new Date().getTime();

  opcoes: BandeiraCartaoOption[] = [];

  selectedOption: BandeiraCartaoOption = {
    label: 'Selecione a Bandeira',
    img: '',
    value: '',
  };

  disableSendButton: boolean = false;

  constructor(
    private storageService: StorageService,
    private propostaService: PropostaService,
    private routerService: RouterService,
    private toast: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.opcoes = BrandDetectorDirective.getOptions();
  }

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

  FormValido() {
    this.disableSendButton = true;
    const nome = this.formCartao.get('nome')!.value!;
    const cvv = this.formCartao.get('codigoSeguranca')!.value!;
    const numero = this.formCartao.get('numeroCartao')!.value!;
    const dataValidade = this.formataDataValidade(this.formCartao.get('dataValidade')!.value);
    const cartao: CartaoCredito = {
      codigoSeguranca: cvv,
      dataValidade: dataValidade,
      nome: nome,
      numeroCartao: numero,
      bandeira: this.selectedOption.value,
    };
    this.FinalizaPedido(cartao);
  }

  setRecaptchaChecked(value: string) {
    this.recaptchaChecked = !!value;
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  selectOption(op: BandeiraCartaoOption) {
    this.selectedOption = op;
    this.formCartao.get('bandeira')?.setValue(op.value);
    this.showOptions = false;
  }

  detectorBandeira() {
    const numero = this.formCartao.get('numeroCartao')!.value!;

    if (!numero.length) {
      this.selectOption({
        label: 'Selecione a Bandeira',
        img: '',
        value: '',
      });
    } else {
      const bandeira = BrandDetectorDirective.detectar(numero);

      const op: BandeiraCartaoOption | undefined = this.opcoes.find(
        (value) => value.value === bandeira
      );
      if (op) {
        this.selectOption(op);
      } else {
        this.selectOption({
          label: 'Selecione a Bandeira',
          img: '',
          value: '',
        });
      }
    }
  }

  onSave(value: Response<RetornoFaturaProposta>, storage: StorageService) {
    if (value.success) {
      storage.saveData(StorageEnum.FormaPgto, FormaPagamentoRegras.CARTAO);
      storage.saveData(StorageEnum.RetornoFaturaProposta, value.data);
      this.proposta!.statusProposta = 6;
      storage.saveData(StorageEnum.Proposta, this.proposta!);
      this.routerService.goTo(RouterEnum.CONCLUSAO);
    } else {
      this.toast.Warning(
        'Não foi possível concluir a proposta na modalidade Cartão: Cartão não aceito.'
      );
    }
  }

  FinalizaPedido(cartao: CartaoCredito) {
    this.recaptchaV3Service.execute('submit').subscribe((token) => {
      if (this.cicloPagamento && this.proposta && token) {
        if (this.proposta.statusProposta === 2) {
          this.propostaService
            .AlterarCartao({
              idProposta: this.proposta.id,
              idParceiro: 4,
              cartao: cartao,
            })
            .pipe(finalize(() => {
              this.loadingService.setMessage(null);
              this.disableSendButton = false;
            }))
            .subscribe({
              next: (value) => {
                switch (value.data.statusPerfilPagamento) {
                  case StatusPerfilPagamento.Valido:
                    this.onSave(value, this.storageService);
                    break;

                  case StatusPerfilPagamento.Invalido:
                    const errors = value.data.erros.join('; ');
                    this.toast.ErrorFinalizaProposta(errors);
                    break;

                  default:
                    this.toast.ErrorFinalizaProposta();
                    break;
                }
              },
              error: (err) => {
                const msg: string = err.error.errors ?? err.error;

                if (
                  msg.includes('card_cvv') ||
                  msg.includes('card_expiration') ||
                  msg.includes('holder_name') ||
                  msg.includes('card_number') ||
                  msg.includes('payment_company_code')
                ) {
                  this.toast.ErrorFinalizaProposta('Cartão Inválido');
                } else {
                  this.toast.Error(msg);
                }
              },
            });
        } else {
          this.propostaService
            .FinalizarPedido({
              idParceiro: 4,
              cicloPagamento: this.cicloPagamento,
              formaPagamento: FormaPagamentoRegras.CARTAO,
              idProposta: this.proposta.id,
              cartao: cartao,
            }).pipe(finalize(() => {
              this.loadingService.setMessage(null);
              this.disableSendButton = false;
            }))
            .subscribe({
              next: (value) => {
                switch (value.data.statusPerfilPagamento) {
                  case StatusPerfilPagamento.Valido:
                    this.onSave(value, this.storageService);
                    break;

                  case StatusPerfilPagamento.Invalido:
                    const errors = value.data.erros.join('; ');
                    this.toast.ErrorFinalizaProposta(errors);
                    this.proposta!.statusProposta = 2;
                    this.storageService.saveData(
                      StorageEnum.Proposta,
                      this.proposta!
                    );
                    break;

                  default:
                    this.toast.ErrorFinalizaProposta();
                    break;
                  }
                },
                error: (err) => {
                const msg: string = err.error.errors ?? err.error;
                if (
                  msg.includes('card_cvv') ||
                  msg.includes('card_expiration') ||
                  msg.includes('holder_name') ||
                  msg.includes('card_number') ||
                  msg.includes('payment_company_code')
                ) {
                  this.toast.ErrorFinalizaProposta('Cartão Inválido');
                } else {
                  this.toast.Error(msg);
                }
              }
            });
        }
      } else if (!this.proposta) {
        this.toast.Warning(
          'Problemas ao finalizar a proposta: A proposta não foi encontrada'
        );
      } else if (!this.cicloPagamento) {
        this.toast.Warning(
          'Problemas ao finalizar a proposta: A carência não foi selecionada'
        );
      } else {
        this.toast.Warning(
          'Problemas ao finalizar a proposta: Não foi possível buscar o reCaptcha token'
        );
      }
    });
  }

  onFocus(event: FocusEvent): void {
    this.flipCartao = true;
  }

  onFocusOut(event: FocusEvent): void {
    this.flipCartao = false;
  }

  formataDataValidade(value: string | null): string {
    if(value) {
      const values = value.split('/');
      if(values[0].length == 1) values[0] = `0${values[0]}`;
      values[1] = `20${values[1]}`;
      return `${values[0]}${values[1]}`;
    }
    return '';
  }
}
