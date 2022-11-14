import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { LancamentoFiltro, LancamentoService } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos: any[] = [];
  @ViewChild('tabela') grid!: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ){}

  ngOnInit(): void{
    //this.pesquisar();
  }

  pesquisar(pagina = 0): void{
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {

        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      });
    }

    aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event!.first! / event!.rows!;
      this.pesquisar(pagina);
    }

    confirmarExclusao(lancamento: any): void{
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir',
        accept: () => {
          this.excluir(lancamento);
        }
      });
    }

    excluir(lancamento: any){

      this.lancamentoService.excluir(lancamento.codigo)
        .then(() =>{
          if(this.grid.first === 0){
            this.pesquisar();
          } else {
            this.grid.reset();
          }

          this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!'})
        });
    }

  }
