import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ReCaptchaV3Service } from "ng-recaptcha";
import { concatMap, finalize } from "rxjs";
import { LoadingService } from "src/app/shared/component/loading/loading.service";
import { RouterEnum, StorageEnum } from "src/app/shared/core/enum";
import { Corretor, Proposta } from "src/app/shared/core/models";
import { CorretorService } from "src/app/shared/core/services/api/corretor/corretor.service";
import { ProdutoService } from "src/app/shared/core/services/api/produto/produto.service";
import { PropostaService } from "src/app/shared/core/services/api/proposta/proposta.service";
import { RouterService } from "src/app/shared/core/services/router/router.service";
import { StorageService } from "src/app/shared/core/services/storage/storage.service";

@Component({
    template: '',
    standalone: false
})
export class PageReativarPropostaComponent {

  proposta: Proposta | null = null;
  corretor: Corretor | null = null;

  constructor(
    private propostaService: PropostaService,
    private storageService: StorageService,
    private routerService: RouterService,
    private loadingService: LoadingService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private corretorService: CorretorService,
    private produtoService: ProdutoService,
  ) {
    this.clonarProposta();
  }

  async clonarProposta() {
    const uid: string | null = this.storageService.getData(StorageEnum.UID);
    // console.log('uid antigo', uid);
    if(uid) {
      this.recaptchaV3Service.execute('submit').subscribe({
        next: token => {
          this.propostaService.ClonarPropostaPixCancelada(uid, token)
          .pipe(finalize(() => this.loadingService.setMessage(null)))
            .subscribe({
              next: res => {
                this.storageService.removeAll();
                this.storageService.saveData(StorageEnum.UID, res.data.uid);
                this.getNovaProposta();
              },
              error: err => {
                this.routerService.goToError404Page();
              }
            })
        },
        error: err => {
          this.loadingService.setMessage(null);
          this.routerService.goToError404Page();
        }
      })

    } else {
      this.loadingService.setMessage(null);
      this.routerService.goToError404Page();
    }
  }

  getNovaProposta() {
    let uid = this.storageService.getData<string>(StorageEnum.UID);
    if(uid)
      this.propostaService
        .GetProposta(uid)
        .pipe(
          concatMap((response) => {
            this.proposta = response.data;
            this.storageService.saveData(StorageEnum.Proposta, response.data);

            return this.corretorService.BuscarCorretor(
              response.data.idCorretor
            );
          }),
          concatMap((response2) => {
            this.corretor = response2.data;
            this.storageService.saveData(StorageEnum.Corretor, response2.data);
            return this.produtoService.TaxaBancaria();
          })
        )
        .subscribe({
          next: (taxa) => {
            this.storageService.saveData(StorageEnum.PropostaReativada, true);
            this.storageService.saveData(StorageEnum.TxBancaria, taxa.data);
            this.routerService.goTo(RouterEnum.ESCOLHA_FORMA_PGTO);
          },

          error: () => {
            this.routerService.goToErrorPage();
          },
        });
  }
}
