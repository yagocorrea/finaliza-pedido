import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PropostaService } from './shared/core/services/api/proposta/proposta.service';
import { CorretorService } from './shared/core/services/api/corretor/corretor.service';
import { Corretor, Proposta } from './shared/core/models';
import { ProdutoService } from './shared/core/services/api/produto/produto.service';
import { StorageService } from './shared/core/services/storage/storage.service';
import { RouterEnum, StorageEnum } from './shared/core/enum';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { RouterService } from './shared/core/services/router/router.service';
import { validate } from 'uuid';
import { LoadingService } from './shared/component/loading/loading.service';
import { concatMap } from 'rxjs';

declare let gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'finalizaPedido';
  proposta: Proposta | undefined;
  corretor: Corretor | undefined;
  cancelamento: boolean = false;

  // idGoogleAnalytics = custom.sistema.idGoogleAnalytics ; //Pegar do custom
  constructor(
    private router: Router,
    private propostaService: PropostaService,
    private corretorService: CorretorService,
    private produtoService: ProdutoService,
    private storageService: StorageService,
    private location: Location,
    private routerService: RouterService,
    public loadingService: LoadingService
  ) {
    // this.autenticacaoService.carregarPermissoes();
    // this.autenticacaoService.carregarPerfisAcesso();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // if(this.idGoogleAnalytics){
        //   gtag('config', this.idGoogleAnalytics,{
        //     'page_path': event.urlAfterRedirects
        //   });
        // }
        // window.scroll(0, 0);
      }
    });
  }

ngOnInit(): void{
  
}

  // ngOnInit(): void {
  //   //  Comando abaixo é para pegar a uid e remover o primeiro elemento da lista que é vazio
  //   const url = this.location
  //     .path()
  //     .split('/')
  //     .filter((el) => !!el);

  //   console.log('url:', url);
  //   let uidToUse = url[0];

  //   if (uidToUse === 'corretor') {
  //     this.routerService.enableVisaoCorretor();
  //     uidToUse = url[1];
  //   }

  //   if(uidToUse === 'cancelamento-corretor') {
  //     this.cancelamento = true;
  //     uidToUse = url[1];
  //   }

  //   if(uidToUse === 'reativar-proposta') {
  //     uidToUse = url[1];
  //     this.storageService.saveData(StorageEnum.UID, uidToUse);
  //     return;
  //   }

  //   if (!validate(uidToUse)) {
  //     uidToUse = '';
  //   }
  //   console.info('uid: ', uidToUse);
  //   if (uidToUse) {
  //     this.storageService.saveData(StorageEnum.UID, uidToUse);

  //     this.propostaService
  //       .GetProposta(uidToUse)
  //       .pipe(
  //         concatMap((response) => {
  //           this.proposta = response.data;
  //           this.storageService.saveData(StorageEnum.Proposta, response.data);

  //           return this.corretorService.BuscarCorretor(
  //             response.data.idCorretor
  //           );
  //         }),
  //         concatMap((response2) => {
  //           this.corretor = response2.data;
  //           this.storageService.saveData(StorageEnum.Corretor, response2.data);
  //           return this.produtoService.TaxaBancaria();
  //         })
  //       )
  //       .subscribe({
  //         next: (taxa) => {
  //           this.storageService.saveData(StorageEnum.TxBancaria, taxa.data);

  //           if (this.proposta) {

  //             // Verifico se a proposta está na página de cancelamento
  //             if (this.cancelamento) {
  //               return;
  //             }

  //             const result = environment.planosValidos.find(
  //               (v) => v.id === this.proposta!.idPlano
  //             );

  //             // Verifico se a o plano da proposta pertence ao conjunto do tema
  //             if (!result) {
  //               this.routerService.goToErrorPage();

  //               // Verifico se a proposta está com status diferente do aguardando forma de pgto ou pgto em aberto
  //             } else if (this.proposta.statusProposta > 2) {
  //               this.routerService.goToPropostaConcluidaPage();

  //               // Verifico se a proposta já veio com o carência selecionada
  //             } else if (this.proposta.cicloPagamento) {
  //               this.routerService.goTo(RouterEnum.ESCOLHA_FORMA_PGTO);
  //             } else {
  //               this.routerService.goTo(RouterEnum.ESCOLHA_TEMPO_CARENCIA);
  //             }
  //           } else {
  //             this.routerService.goToErrorPage();
  //           }
  //         },

  //         error: () => {
  //           this.routerService.goToErrorPage();
  //         },
  //       });
  //   } else {
  //     this.routerService.goToError404Page();
  //   }
  // }
}
