import { LazyLoadEvent } from 'primeng/api';
import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas: any[] = [];


  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {
  }

  pesquisar(pagina: number = 0): void{
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(dados => {
        this.pessoas = dados.pessoas;
        this.totalRegistros = dados.total;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }


}
