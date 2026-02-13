import { Component, DoCheck, Inject, InjectionToken } from '@angular/core';
import { FormaPagamentoRegras, StorageEnum } from 'src/app/shared/core/enum';
import { Proposta, RetornoFaturaProposta } from 'src/app/shared/core/models';
import { RouterService } from 'src/app/shared/core/services/router/router.service';
import { StorageService } from 'src/app/shared/core/services/storage/storage.service';
import { custom } from 'src/customizacao/custom';
import { environment } from 'src/environments/environment';

const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => window,
});

@Component({
    selector: 'app-page-conclusao',
    templateUrl: './page-conclusao.component.html',
    styleUrls: ['./page-conclusao.component.scss'],
    standalone: false
})
export class PageConclusaoComponent implements DoCheck {
  custom = custom;
  time = new Date().getTime();
  proposta: Proposta | null = null;
  fomaPgto: FormaPagamentoRegras | null = null;
  enviaEmail: boolean = false;

  urlFinalizaPgto = '';

  constructor(
    private storageService: StorageService,
    private routerService: RouterService,
    @Inject(WINDOW) private window: Window
  ) {}
  ngDoCheck() {
    this.proposta = this.storageService.getData<Proposta>(StorageEnum.Proposta);

    this.fomaPgto = this.storageService.getData<FormaPagamentoRegras>(
      StorageEnum.FormaPgto
    );
    this.enviaEmail = !!this.storageService.getData<boolean>(
      StorageEnum.EnviaEmail
    );

    this.urlFinalizaPgto = environment.urlFinalizaPedido + this.proposta?.uid;

    if (this.fomaPgto === FormaPagamentoRegras.BOLETO) {
      const fatura = this.storageService.getData<RetornoFaturaProposta>(
        StorageEnum.RetornoFaturaProposta
      );

      this.urlFinalizaPgto = fatura ? fatura.linkBoleto! : '';
    }
  }

  isPix() {
    return this.fomaPgto === FormaPagamentoRegras.PIX;
  }

  isCartao() {
    return this.fomaPgto === FormaPagamentoRegras.CARTAO;
  }

  isBoleto() {
    return this.fomaPgto === FormaPagamentoRegras.BOLETO;
  }

  isEmail() {
    return this.enviaEmail;
  }

  isCorretor() {
    return this.routerService.getVisaoCorretor();
  }

  CopiarCodigo() {
    const btn = document.querySelector('.Btn_Copiar_Link');
    if (this.urlFinalizaPgto && btn) {
      navigator.clipboard
        .writeText(this.urlFinalizaPgto)
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
    if (navigator.share && this.urlFinalizaPgto) {
      let shareData = {
        title: 'Termine sua proposta',
        text: 'Acesse o link abaixo e finalize seu pedido',
        url: this.urlFinalizaPgto,
      };

      if (this.isBoleto()) {
        shareData = {
          title: 'Termine sua proposta',
          text: 'Acesse o link abaixo para abrir o boleto para finalizar a sua proposta',
          url: this.urlFinalizaPgto,
        };
      }

      navigator
        .share(shareData)
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log('Error sharing:', error));
    }
  }

  AbrirLinkFatura() {
    if (this.urlFinalizaPgto) {
      this.window.open(this.urlFinalizaPgto, '_blank');
    }
  }
}
