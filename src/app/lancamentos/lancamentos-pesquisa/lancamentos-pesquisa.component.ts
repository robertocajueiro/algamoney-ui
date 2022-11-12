import { LancamentoService } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos: any[] = [];

  constructor(private LancamentoService: LancamentoService){}

  ngOnInit(): void{
    this.pesquisar();
  }

  pesquisar(): void{
    this.LancamentoService.pesquisar()
      .then(lancamentos => this.lancamentos = lancamentos);
  }

}
