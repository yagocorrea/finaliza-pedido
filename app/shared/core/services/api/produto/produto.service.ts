import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Produto, Response } from '../../../models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private apiUrl = environment.host;

  constructor(private http: HttpClient) {}

  TaxaBancaria(): Observable<Response<Produto>> {
    return this.http
      .get(this.apiUrl + environment.endpoints.produto.taxaBancaria)
      .pipe(
        map((response) => {
          return response as Response<Produto>;
        })
      );
  }
}
