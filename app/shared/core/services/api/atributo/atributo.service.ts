import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AssociaAtributoProposta } from "../../../models/associa-atributo-proposta";
import { Response } from "../../../models";

@Injectable({ providedIn: 'root' })
export class AtributoService {
  private apiUrl = environment.host;

  constructor(private http: HttpClient) {}

  AssociaAtributoProposta(obj: AssociaAtributoProposta): Observable<Response<String>> {
    return this.http.post(
      this.apiUrl +
      environment.endpoints.atributo.associaAtributoProposta,
      obj
    )
    .pipe(
      map((response) => {
        return response as Response<String>;
      })
    );
  }

}
