import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Produto, Response } from '../../../models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class VendaService {
  private apiUrl = environment.host;

  constructor(private http: HttpClient) {}

  /* ===================== EMPRESA ===================== */

  buscaEmpresa(dados: any): Observable<Response<any>> {
    return this.http
      .post(
        `${this.apiUrl}/api/Contratante/ObterContratante`,
        dados
      )
      .pipe(map(res => res as Response<any>));
  }

  cadastraDadosEmpresa(dados: any): Observable<Response<any>> {
    const url = dados.id
      ? `${this.apiUrl}/api/Contratante`
      : `${this.apiUrl}/api/Contratante/Create`;

    const method$ = dados.id
      ? this.http.put(url, dados)
      : this.http.post(url, dados);

    return method$.pipe(map(res => res as Response<any>));
  }

  /* ===================== ENDEREÇO ===================== */

  cadastraEnderecoEmpresa(dados: any): Observable<Response<any>> {
    const url = dados.id
      ? `${this.apiUrl}/api/Endereco`
      : `${this.apiUrl}/api/Endereco/Create`;

    const method$ = dados.id
      ? this.http.put(url, dados)
      : this.http.post(url, dados);

    return method$.pipe(map(res => res as Response<any>));
  }

  buscaEnderecoEmpresa(idEndereco: number): Observable<Response<any>> {
    return this.http
      .get(`${this.apiUrl}/api/Endereco/${idEndereco}`)
      .pipe(map(res => res as Response<any>));
  }

  /* ===================== CONTATO ===================== */

  cadastraContatoEmpresa(dados: any): Observable<Response<any>> {
    const url = dados.id
      ? `${this.apiUrl}/api/Contato`
      : `${this.apiUrl}/api/Contato/Create`;

    const method$ = dados.id
      ? this.http.put(url, dados)
      : this.http.post(url, dados);

    return method$.pipe(map(res => res as Response<any>));
  }

  buscaContatoEmpresa(id: number): Observable<Response<any>> {
    return this.http
      .get(`${this.apiUrl}/api/Contato/${id}`)
      .pipe(map(res => res as Response<any>));
  }

  /* ===================== REPRESENTANTE ===================== */

  cadastraRepresentanteEmpresa(dados: any): Observable<Response<any>> {
    const url = dados.id
      ? `${this.apiUrl}/api/RepresentanteLegal`
      : `${this.apiUrl}/api/RepresentanteLegal/Create`;

    const method$ = dados.id
      ? this.http.put(url, dados)
      : this.http.post(url, dados);

    return method$.pipe(map(res => res as Response<any>));
  }

  buscaContatoRepresentanteEmpresa(id: number): Observable<Response<any>> {
    return this.http
      .get(`${this.apiUrl}/api/RepresentanteLegal/${id}`)
      .pipe(map(res => res as Response<any>));
  }

  /* ===================== CORRETOR ===================== */

  buscaCorretor(cpf: string): Observable<Response<any>> {
    return this.http
      .get(`${this.sgecUrl}/integracao/webapi/api/corretor/buscar?cpf=${cpf}`) //mudar a chamada
      .pipe(map(res => res as Response<any>));
  }

  cadastraCorretor(dados: any, token?: string): Observable<Response<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Custom ${token}`
    });

    return this.http
      .post(
        //`${this.sgecUrl}/integracao/webapi/api/Corretor`,
        dados,
        { headers }
      )
      .pipe(map(res => res as Response<any>));
  }

  buscaCorretorEmpresa(id: number): Observable<Response<any>> {
    return this.http
      .get(`${this.apiUrl}/api/Corretor/${id}`)
      .pipe(map(res => res as Response<any>));
  }

  /* ===================== SIMULAÇÃO ===================== */

  enviarSimulacao(dados: any): Observable<Response<any>> {
    return this.http
      .post(`${this.apiUrl}/api/Cotacao/Create`, dados)
      .pipe(map(res => res as Response<any>));
  }

  /* ===================== SEGURADOS ===================== */

  cadastraTitular(dados: any): Observable<Response<any>> {
    return this.http
      .post(`${this.apiUrl}/api/Segurado/Create`, dados)
      .pipe(map(res => res as Response<any>));
  }

  editaTitular(dados: any): Observable<Response<any>> {
    return this.http
      .put(`${this.apiUrl}/api/Segurado`, dados)
      .pipe(map(res => res as Response<any>));
  }

  deletaTitular(id: number): Observable<Response<any>> {
    return this.http
      .delete(`${this.apiUrl}/api/Segurado/${id}`)
      .pipe(map(res => res as Response<any>));
  }

  getSegurados(idContratante: number): Observable<Response<any>> {
    return this.http
      .get(`${this.apiUrl}/api/Segurado/GetAll?idContratante=${idContratante}`)
      .pipe(map(res => res as Response<any>));
  }

  /* ===================== DEPENDENTES ===================== */

  cadastraDependente(dados: any): Observable<Response<any>> {
    return this.http
      .post(`${this.apiUrl}/api/Dependente/Create`, dados)
      .pipe(map(res => res as Response<any>));
  }

  editaDependente(dados: any): Observable<Response<any>> {
    return this.http
      .put(`${this.apiUrl}/api/Dependente`, dados)
      .pipe(map(res => res as Response<any>));
  }

  deletaDependente(id: number): Observable<Response<any>> {
    return this.http
      .delete(`${this.apiUrl}/api/Dependente/${id}`)
      .pipe(map(res => res as Response<any>));
  }

  /* ===================== RESUMO / PROPOSTA ===================== */

  getResumo(idContratante: number, idProduto: number): Observable<Response<any>> {
    return this.http
      .get(
        `${this.apiUrl}/api/Contratante/GetResumo?idContratante=${idContratante}&idProduto=${idProduto}`
      )
      .pipe(map(res => res as Response<any>));
  }

  finalizaProposta(dados: any): Observable<Response<any>> {
    return this.http
      .post(`${this.apiUrl}/api/Proposta/Create`, dados)
      .pipe(map(res => res as Response<any>));
  }

  /* ===================== AUXILIARES ===================== */

  validaFaixaCep(cep: string, idContratante: number): Observable<Response<any>> {
    if (!cep) return of({} as Response<any>);

    const cepTratado = cep.replace('-', '');

    return this.http
      .get(
        `${this.apiUrl}/api/Endereco/PertenceFaixaCEP?CEP=${cepTratado}&IdContratante=${idContratante}`
      )
      .pipe(map(res => res as Response<any>));
  }

  buscaProdutores(): Observable<Response<any>> {
    return this.http
      .get(`${this.sgecUrl}/integracao/webapi/api/produtor`) //mudar a chamada
      .pipe(map(res => res as Response<any>));
  }

  buscaInfoByCpf(dados: any): Observable<Response<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer wVOeU1U/c0uY4KxcUwHbOw=='
    });

    return this.http
      .post(`${this.marlinUrl}/api/v2/recap/cpfs`, dados, { headers }) //mudar a chamada
      .pipe(map(res => res as Response<any>));
  }

  buscaSocios(idContratante: number): Observable<Response<any>> {
    return this.http
      .get(
        `${this.apiUrl}/api/Contratante/GetSocios?idContratante=${idContratante}`
      )
      .pipe(map(res => res as Response<any>));
  }
}
