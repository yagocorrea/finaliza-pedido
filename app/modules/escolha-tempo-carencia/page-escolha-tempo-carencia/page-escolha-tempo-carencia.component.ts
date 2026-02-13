import {
  Component,
  ViewEncapsulation,
  DoCheck,
  Inject,
  InjectionToken,
} from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RouterEnum, StorageEnum } from 'src/app/shared/core/enum';
import { Corretor, Proposta } from 'src/app/shared/core/models';
import { PropostaService } from 'src/app/shared/core/services/api/proposta/proposta.service';
import { RouterService } from 'src/app/shared/core/services/router/router.service';
import { StorageService } from 'src/app/shared/core/services/storage/storage.service';
import { ToastService } from 'src/app/shared/core/services/toast/toast.service';
import { custom } from 'src/customizacao/custom';
import { environment } from 'src/environments/environment';

const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => window,
});

@Component({
    selector: 'app-page-escolha-tempo-carencia',
    templateUrl: './page-escolha-tempo-carencia.component.html',
    styleUrls: ['./page-escolha-tempo-carencia.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class PageEscolhaTempoCarenciaComponent implements DoCheck {
  time = new Date().getTime();
  titulo: string = '';
  proposta: Proposta | null = null;
  corretor: Corretor | null = null;
  cicloPagamento: number | null = null;
  recaptchaToken: string | undefined = undefined;
  carenciaChecked = false;
  btnEnviarLinkHabilitado = false;
  showModal = false;

  constructor(
    private storageService: StorageService,
    private propostaService: PropostaService,
    private routerService: RouterService,
    private toast: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service,
    @Inject(WINDOW) private window: Window
  ) {}

  ngDoCheck(): void {
    this.proposta = this.storageService.getData<Proposta>(StorageEnum.Proposta);
    this.cicloPagamento = this.storageService.getData<number>(
      StorageEnum.CicloPagamento
    );
    if (!this.cicloPagamento && this.proposta) {
      this.cicloPagamento = this.proposta.cicloPagamento;
    }
    this.carenciaChecked = !!this.cicloPagamento;
    this.corretor = this.storageService.getData<Corretor>(StorageEnum.Corretor);
    if (
      this.corretor &&
      this.corretor.cpf !== '16844872771' &&
      this.routerService.getVisaoCorretor()
    ) {
      this.btnEnviarLinkHabilitado = true;
    }

    if (this.routerService.getVisaoCorretor()) {
      this.titulo = 'Escolha o tempo de carência';
    } else {
      this.titulo = 'Conclua o seu pedido';
    }
  }

  isVisaoCorretor() {
    return this.routerService.getVisaoCorretor();
  }

  getValorProposta() {
    if (this.proposta) {
      return this.proposta.produtoValor * this.proposta.totalSegurados;
    }

    return 0;
  }

  setCicloPagamento(valor: number) {
    this.cicloPagamento = valor;
    this.carenciaChecked = !!this.cicloPagamento;
  }

  setRecaptchaChecked(value: string) {
    this.recaptchaToken = value;
  }

  FormValido() {
    if (this.carenciaChecked) {
      if (this.cicloPagamento !== this.proposta?.cicloPagamento) {
        this.recaptchaV3Service.execute('submit').subscribe((token) => {
          this.recaptchaToken = token;
          if (this.recaptchaToken && this.proposta) {
            this.propostaService
              .AlterarCicloProposta({
                propostaID: this.proposta.id,
                responseKey: this.recaptchaToken,
                cicloPagamento: this.cicloPagamento!,
              })
              .subscribe({
                next: (value) => {
                  this.proposta!.cicloPagamento = this.cicloPagamento!;
                  this.storageService.saveData(
                    StorageEnum.Proposta,
                    this.proposta
                  );
                  this.routerService.goTo(RouterEnum.ESCOLHA_FORMA_PGTO);
                },
                error: (err) => {
                  const msg = err.error.errors ?? err.error;
                  this.toast.Error(msg);
                },
              });
          } else if (!this.proposta) {
            this.toast.Warning(
              'Não foi possível concluir a operação: A proposta não foi encontrada'
            );
          } else {
            this.toast.Warning('Não foi possível buscar o reCaptcha token');
          }
        });
      } else {
        this.routerService.goTo(RouterEnum.ESCOLHA_FORMA_PGTO);
      }
    } else {
      this.toast.InfoWarning('Por favor, escolha o tempo de carência');

      const element = document.getElementById('CardsTempoCarencia');
      if (element) {
        const offsetTop = element.offsetTop - 40;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }

  backHandler() {
    if (this.corretor) {
      this.window.open(
        `${environment.urlBasePaginaVenda}${this.corretor.nomeGuerra
          .toLocaleLowerCase()
          .replaceAll(' ', '-')}/${this.corretor.cpf}`,
        '_self'
      );
    }
  }

  get images() {
    let files = [
      `${custom.sistema.banners.superior.desktop}?t=${this.time}`,
      `${custom.sistema.banners.superior.mobile}?t=${this.time}`,
    ];

    return files;
  }

  get sizeImages() {
    let sizes = ['(min-width: 790px)', '(min-width: 320px)'];

    return sizes;
  }
}
