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

    let params = new HttpParams();

      params = params.set('page', filtro.pagina);
      params = params.set('size', filtro.itensPorPagina);

      if (filtro.nome) {
        params = params.set('nome', filtro.nome);
      }

      return this.http.get(`${this.pessoasUrl}`, { params})
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
    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then((response: any) => response['content']);
  }

  excluir(codigo: number): Promise<void>{
   return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void>{
   return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
    .toPromise();

  }

  adicionar(pessoa: Pessoa): Promise<Pessoa | undefined>{
   return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa | undefined> {
   return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
    .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa | undefined> {
   return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise();
  }

}
