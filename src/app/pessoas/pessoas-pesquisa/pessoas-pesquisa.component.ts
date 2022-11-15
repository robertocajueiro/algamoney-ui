import { Component, ViewChild } from '@angular/core';
import { ErrorHandlerService } from './../../core/error-handler.service';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

import { PessoaFiltro, PessoaService } from './../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas: any[] = [];
  @ViewChild('tabela') grid!: any;


  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) { }

  pesquisar(pagina: number = 0): void{
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then((dados: any ) => {
        this.pessoas = dados.pessoas;
        this.totalRegistros = dados.total;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any): void{
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any){
    this.pessoaService.excluir(pessoa.codigo)
    .then(() => {

      this.grid.reset();

      this.messageService.add({ severity: 'success', detail: 'Pessoa excluído com sucesso!' })
     }
   )
    .catch((error) => this.errorHandler.handle(error));
  }
}


