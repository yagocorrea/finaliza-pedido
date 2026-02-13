import { AssociaAtributoProposta } from './../../../shared/core/models/associa-atributo-proposta';
import { AfterViewInit, Component, DoCheck, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { StorageEnum } from "src/app/shared/core/enum";
import { Corretor, Proposta } from "src/app/shared/core/models";
import { AtributoService } from "src/app/shared/core/services/api/atributo/atributo.service";
import { PropostaService } from "src/app/shared/core/services/api/proposta/proposta.service";
import { StorageService } from "src/app/shared/core/services/storage/storage.service";
import { ToastService } from 'src/app/shared/core/services/toast/toast.service';

@Component({
    selector: 'app-page-cancelamento-corretor',
    templateUrl: './page-cancelamento-corretor.component.html',
    styleUrls: ['./page-cancelamento-corretor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class PageCancelamentoCorretor implements OnInit, DoCheck {

  proposta: Proposta | null = null;
  corretor: Corretor | null = null;
  cancelamentoConcluido: boolean = false;

  constructor(
    private storageService: StorageService,
    private propostaService: PropostaService,
    private atributoService: AtributoService,
    private toast: ToastService
  ) {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.proposta = this.storageService.getData(StorageEnum.Proposta);
    this.corretor = this.storageService.getData(StorageEnum.Corretor);
  }


  handleCancelarProposta() {
    if(this.proposta) {
      const idProposta = this.proposta.id;
      this.propostaService.AtualizarProposta({ idStatus: 9, propostaId: idProposta }).subscribe({
        next: res => {
          this.associaAtributoProposta({ atributoID: 1, propostaID: idProposta, valor: "Solicitação do Corretor" }, true);
        },
        error: err => {
          this.toast.Warning(
            'Não foi possível concluir o cancelamento. Clique no botão abaixo e tente novamente mais tarde.'
          );
        }
      })

    }
  }

  associaAtributoProposta(obj: AssociaAtributoProposta, callback: boolean) {
    this.atributoService.AssociaAtributoProposta(obj).subscribe({
      next: res => {
        if(callback && this.proposta ) {
          this.associaAtributoProposta({ atributoID: 2, propostaID: this.proposta.id, valor: "" }, false);
          return;
        }
        this.storageService.removeData(StorageEnum.Proposta);
        this.cancelamentoConcluido = true;
      },

      error: err => {
        this.toast.Warning(
          'Erro durante o cancelamento. Clique no botão abaixo e tente novamente mais tarde.'
        );
      }
    })
  }
}
