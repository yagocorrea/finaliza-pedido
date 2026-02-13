import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AlterarCartao,
  AlterarCicloPagamento,
  FaturaProposta,
  PixPago,
  Proposta,
  ReiniciarStatusProposta,
  Response,
  RetornoFaturaProposta,
} from '../../../models';
import { StorageService } from '../../storage/storage.service';
import { FormaPagamentoRegras, StorageEnum } from '../../../enum';
import { AtualizarStatusProposta } from '../../../models/atualizar-status-proposta';
import { LoadingService } from 'src/app/shared/component/loading/loading.service';

@Injectable({ providedIn: 'root' })
export class PropostaService {
  private apiUrl = environment.host;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private loadingService: LoadingService
  ) {}

  GetProposta(uid: string): Observable<Response<Proposta>> {
    const cachedProposta: Proposta | null = this.storageService.getData(
      StorageEnum.Proposta
    );

    if (cachedProposta && cachedProposta.uid === uid) {
      return of<Response<Proposta>>({ success: true, data: cachedProposta });
    } else {
      this.RemovedDataSession();
      return this.http
        .get<Response<Proposta>>(
          this.apiUrl + environment.endpoints.proposta.getByUid + uid
        )
        .pipe(
          map((response) => {
            return response as Response<Proposta>;
          })
        );
    }
  }

  AlterarCicloProposta(
    obj: AlterarCicloPagamento
  ): Observable<Response<string>> {
    return this.http
      .post(this.apiUrl + environment.endpoints.proposta.alterarCicloPgto, obj)
      .pipe(
        map((response) => {
          return response as Response<string>;
        })
      );
  }

  ReiniciarStatusProposta(
    obj: ReiniciarStatusProposta
  ): Observable<Response<string>> {
    return this.http
      .put(
        this.apiUrl + environment.endpoints.proposta.reiniciarStatusProposta,
        obj
      )
      .pipe(
        map((response) => {
          return response as Response<string>;
        })
      );
  }

  AlterarCartao(
    obj: AlterarCartao
  ): Observable<Response<RetornoFaturaProposta>> {
    this.loadingService.setMessage('Seu pagamento com cartão de crédito está em andamento');
    return this.http
      .post(this.apiUrl + environment.endpoints.proposta.alterarCartao, obj)
      .pipe(
        map((response) => {
          return response as Response<RetornoFaturaProposta>;
        })
      );
  }

  FinalizarPedido(
    obj: FaturaProposta
  ): Observable<Response<RetornoFaturaProposta>> {
    switch(obj.formaPagamento) {
      case FormaPagamentoRegras.CARTAO:
        this.loadingService.setMessage('Seu pagamento com cartão de crédito está em andamento');
        // this.loadingService.setMessage('cartão de crédito');
        break;
        case FormaPagamentoRegras.PIX:
        this.loadingService.setMessage('Seu pagamento com pix está em andamento');
        // this.loadingService.setMessage('pix');
        break;
        case FormaPagamentoRegras.BOLETO:
        this.loadingService.setMessage('Seu pagamento com boleto bancário está em andamento');
        // this.loadingService.setMessage('boleto bancário');
        break;
      default:
        this.loadingService.setMessage(null);
    }
    return this.http
      .post(this.apiUrl + environment.endpoints.proposta.finalizaPedido, obj)
      .pipe(
        map((response) => {
          return response as Response<RetornoFaturaProposta>;
        })
      );
  }

  EnviaEmail(uid: string): Observable<Response<boolean>> {
    return this.http
      .post(this.apiUrl + environment.endpoints.proposta.enviaEmail + uid, null)
      .pipe(
        map((response) => {
          return response as Response<boolean>;
        })
      );
  }

  PixFoiPago(propostaId: string): Observable<Response<PixPago>> {
    return this.http
      .post(
        this.apiUrl +
          environment.endpoints.proposta.consultaPgtoPix +
          propostaId,
        null
      )
      .pipe(
        map((response) => {
          return response as Response<PixPago>;
        })
      );
  }

  AtualizarProposta(obj: AtualizarStatusProposta): Observable<Response<string>> {
    return this.http.post(
      this.apiUrl +
      environment.endpoints.proposta.atualizarStatusProposta,
      obj
    )
    .pipe(
      map((response) => {
        return response as Response<string>;
      })
    );
  }


  RemovedDataSession() {
    sessionStorage.removeItem('cicloPagamento');
    sessionStorage.removeItem('carenciaChecked');
  }

  ClonarPropostaPixCancelada(uid: string, token: string): Observable<Response<Proposta>> {
    this.loadingService.setMessage('Sua proposta está sendo reativada');
    return this.http.post<Response<Proposta>>(
      this.apiUrl + environment.endpoints.proposta.clonarPropostaPixCancelada + uid + `&responseKey=${token}`,
      null
    )
  }
}
