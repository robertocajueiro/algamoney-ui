import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pessoa, Lancamento } from './../core/model';

export class PessoaFiltro {
  nome!: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas'

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any>{

    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

    let params = new HttpParams();

      params = params.set('page', filtro.pagina);
      params = params.set('size', filtro.itensPorPagina);

      if (filtro.nome) {
        params = params.set('nome', filtro.nome);
      }

      return this.http.get(`${this.pessoasUrl}`, {headers, params})
        .toPromise()
        .then((response : any) => {
          const pessoas = response['content'];

          const resultado = {
            pessoas,
            total: response['totalElements']
          };
          return resultado;
        });
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then((response: any) => response['content']);
  }

  excluir(codigo: number): Promise<void>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
    .toPromise();

  }

  adicionar(pessoa: Pessoa): Promise<Pessoa | undefined>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers })
      .toPromise();
  }

}
