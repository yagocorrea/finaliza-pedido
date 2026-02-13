import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Corretor, Response } from '../../../models';

@Injectable({ providedIn: 'root' })
export class CorretorService {
  private apiUrl = environment.host;

  constructor(private http: HttpClient) {}

  BuscarCorretor(corretorId: number): Observable<Response<Corretor>> {
    return this.http
      .get(
        this.apiUrl + environment.endpoints.corretor.getById + `${corretorId}`
      )
      .pipe(
        map((response) => {
          return response as Response<Corretor>;
        })
      );
  }
}
