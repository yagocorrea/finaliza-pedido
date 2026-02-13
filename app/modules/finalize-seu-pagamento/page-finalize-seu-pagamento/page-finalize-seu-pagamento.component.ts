import { Component, DoCheck, Inject, OnDestroy, OnInit, DOCUMENT } from '@angular/core';
import {
  FormaPagamentoRegras,
  PixStatusEnum,
  RouterEnum,
  StorageEnum,
} from 'src/app/shared/core/enum';
import { PropostaService } from 'src/app/shared/core/services/api/proposta/proposta.service';

import { InjectionToken } from '@angular/core';

import {
  Corretor,
  Proposta,
  RetornoFaturaProposta,
} from 'src/app/shared/core/models';
import { StorageService } from 'src/app/shared/core/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { RouterService } from 'src/app/shared/core/services/router/router.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ToastService } from 'src/app/shared/core/services/toast/toast.service';

const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => window,
});

@Component({
    selector: 'app-page-finalize-seu-pagamento',
    templateUrl: './page-finalize-seu-pagamento.component.html',
    styleUrls: ['./page-finalize-seu-pagamento.component.scss'],
    standalone: false
})
export class PageFinalizeSeuPagamentoComponent implements OnInit, OnDestroy {
  proposta: Proposta | null = null;
  corretor: Corretor | null = null;
  pagamento: RetornoFaturaProposta | null = null;
  FormaPagamentoRegras: any;

  constructor(
    private propostaService: PropostaService,
    private storageService: StorageService,
    private routerService: RouterService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toast: ToastService,
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document
  ) {}

  PIX_ENUM = FormaPagamentoRegras.PIX;

  TEMPO_EXPIRACAO = 5;
  TEMPO_VERIFICA_PIX_PAGO = 10000;
  PIX_QR_CODE = '';
  INPUT_PIX_CODIGO =
    'Código de copia e cola indisponível. Abra o pagamento pelo botão abaixo.';
  temporizadorZerado: Date = new Date('1995-12-17T00:00:00');

  carregando = false;
  btnCopiarHabilitado = true;

  temporizadorEstahZerado = false;
  emConsulta = false;

  ultimoStatusPix = PixStatusEnum.AguardandoPagto;
  temporizador: Date = new Date(
    '1995-12-17T00:' + this.TEMPO_EXPIRACAO.toString().padStart(2, '0') + ':00'
  );

  temporizadorFunc: NodeJS.Timeout | undefined;
  estaPagoFunc: NodeJS.Timeout | undefined;

  ngOnInit(): void {
    this.proposta = this.storageService.getData(StorageEnum.Proposta);
    this.corretor = this.storageService.getData(StorageEnum.Corretor);
    this.pagamento = this.storageService.getData(
      StorageEnum.RetornoFaturaProposta
    );
    if (this.pagamento) {
      this.TEMPO_EXPIRACAO = Number(this.pagamento.pixTempoExpiracao);
      if (this.pagamento.pixBase64) {
        this.PIX_QR_CODE = 'data:image/png;base64,' + this.pagamento.pixBase64;
      }

      if (this.pagamento.pixCodigo) {
        this.INPUT_PIX_CODIGO = this.pagamento.pixCodigo;
      } else {
        this.INPUT_PIX_CODIGO = this.pagamento.linkBoleto
          ? this.pagamento.linkBoleto
          : 'Código de copia e cola indisponível. Abra o pagamento pelo botão abaixo.';
      }
    }
    this.initTemporizador();
  }

  ngOnDestroy(): void {
    clearInterval(this.temporizadorFunc);
    clearInterval(this.estaPagoFunc);
  }

  isExpirado() {
    return (
      this.temporizadorEstahZerado ||
      this.ultimoStatusPix === PixStatusEnum.Expirado
    );
  }

  isTempZerado() {
    return this.temporizadorEstahZerado;
  }

  possuiShare() {
    return !!navigator.share;
  }

  calculateDiff() {
    let currentDate = this.temporizador;
    let dateSent = this.temporizadorZerado;

    return Math.floor(
      (Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ) -
        Date.UTC(
          dateSent.getFullYear(),
          dateSent.getMonth(),
          dateSent.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
  }

  temp() {
    if (
      !this.temporizadorEstahZerado &&
      this.ultimoStatusPix === PixStatusEnum.AguardandoPagto
    ) {
      if (Math.abs(+this.temporizador - +this.temporizadorZerado) > 0) {
        this.temporizador.setSeconds(this.temporizador.getSeconds() - 1);
      } else {
        this.ExpiraPagina();
      }
    }
  }

  ExpiraPagina() {
    if (Math.abs(+this.temporizador - +this.temporizadorZerado) <= 0) {
      this.temporizadorEstahZerado = true;
    }
    if (this.ultimoStatusPix === PixStatusEnum.Expirado && this.proposta) {
      this.proposta.statusProposta = 9;
      this.storageService.saveData(StorageEnum.Proposta, this.proposta);
    }
    clearInterval(this.estaPagoFunc);
  }

  Finaliza() {
    this.carregando = true;
    clearInterval(this.temporizadorFunc);
    clearInterval(this.estaPagoFunc);
    this.routerService.goTo(RouterEnum.CONCLUSAO);
  }

  estahPago() {
    if (this.proposta && !this.temporizadorEstahZerado && !this.emConsulta) {
      this.emConsulta = true;
      this.propostaService
        .PixFoiPago(this.proposta.uid)

        .subscribe({
          next: (resultado) => {
            if (resultado && resultado.data && resultado.success) {
              const data = resultado.data;

              switch (data.statusPixPagamento) {
                case PixStatusEnum.Pago:
                  this.ultimoStatusPix = PixStatusEnum.Pago;
                  this.Finaliza();
                  break;

                case PixStatusEnum.AguardandoPagto:
                  this.ultimoStatusPix = PixStatusEnum.AguardandoPagto;
                  break;

                case PixStatusEnum.Expirado:
                default:
                  this.ultimoStatusPix = PixStatusEnum.Expirado;
                  this.ExpiraPagina();
                  break;
              }
            } else {
              this.ultimoStatusPix = PixStatusEnum.Expirado;
              this.ExpiraPagina();
            }
          },
          error: (err) => {
            this.ultimoStatusPix = PixStatusEnum.Expirado;
            this.ExpiraPagina();
          },
          complete: () => {
            this.emConsulta = false;
          },
        });
    }
  }

  initTemporizador() {
    // console.log('Chamando temporizador');
    this.temporizador.setMinutes(this.TEMPO_EXPIRACAO);
    this.temporizadorFunc = setInterval(this.temp.bind(this), 1000);
    this.estaPagoFunc = setInterval(
      this.estahPago.bind(this),
      this.TEMPO_VERIFICA_PIX_PAGO
    );
  }

  RestartTemporizador() {
    this.carregando = true;
    this.emConsulta = true;
    this.estahPago();

    if (this.ultimoStatusPix === PixStatusEnum.AguardandoPagto) {
      this.temporizador = new Date('1995-12-17T00:00:00');
      this.temporizador.setMinutes(this.TEMPO_EXPIRACAO);
      this.temporizadorEstahZerado = false;
      this.estaPagoFunc = setInterval(
        this.estahPago.bind(this),
        this.TEMPO_VERIFICA_PIX_PAGO
      );
    }
    this.emConsulta = false;
    this.carregando = false;
  }

  RestartProposta() {
    if (this.corretor) {
      this.window.open(
        `${environment.urlBasePaginaVenda}${this.corretor.nomeGuerra
          .toLocaleLowerCase()
          .replaceAll(' ', '-')}/${this.corretor.cpf}`
      );
    }
  }

  AbrirLinkFatura() {
    if (this.pagamento && this.pagamento.linkBoleto) {
      this.window.open(this.pagamento.linkBoleto, '_blank');
    }
  }

  CopiarCodigo() {
    const btn = document.querySelector('.CodPix_Botao');
    if (this.pagamento && btn) {
      let value = '';
      if (this.pagamento.pixCodigo) {
        value = this.pagamento.pixCodigo;
      } else if (this.pagamento.linkBoleto) {
        value = this.pagamento.linkBoleto;
      }
      navigator.clipboard
        .writeText(value)
        .then(() => {
          btn.innerHTML = `<i class=\"fas fa-check\" ></i> <span>COPIADO!</span>`;
          setTimeout(() => {
            // console.log('settimeout');

            btn.innerHTML = ` <i class=\"fas fa-copy\"></i><span>COPIAR CÓDIGO</span>`;
          }, 3000);
        })
        .catch((error) => {
          console.error(
            'Falha ao copiar texto para a área de transferência:',
            error
          );
        });
    }
  }

  CompartilharData() {
    if (navigator.share && this.pagamento && this.pagamento.linkBoleto) {
      const shareData = {
        title: 'Finalize seu pagamento',
        text: 'Acesse o link abaixo e realize o seu pagamento',
        url: this.pagamento.linkBoleto,
      };

      navigator
        .share(shareData)
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log('Error sharing:', error));
    }
  }

  backHandler() {
    if (this.proposta) {
      this.recaptchaV3Service.execute('submit').subscribe((token) => {
        this.propostaService
          .ReiniciarStatusProposta({
            propostaUid: this.proposta!.uid,
            responseKey: token,
          })
          .subscribe({
            next: (value) => {
              this.proposta!.statusProposta = 1;
              this.storageService.saveData(
                StorageEnum.Proposta,
                this.proposta!
              );
              this.routerService.goTo(RouterEnum.ESCOLHA_FORMA_PGTO);
            },
            error: (err) => {
              const msg = err.error.errors ?? err.error;
              this.toast.Error(msg);
            },
          });
      });
    } else {
      this.toast.Warning('Não foi possível buscar a proposta.');
    }
  }
}
