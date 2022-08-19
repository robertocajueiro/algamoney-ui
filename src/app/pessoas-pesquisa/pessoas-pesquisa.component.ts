import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pessoas = [
    { nome: 'Roberto Dantas', cidade: 'Recife', estado: 'PE', status: 1},
    { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', status: 1},
    { nome: 'Sebastião Silva', cidade: 'São Paulo', estado: 'SP', status: 0},
  ];

}
