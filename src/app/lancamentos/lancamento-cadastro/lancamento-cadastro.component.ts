import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [
    { label: 'Alimentos', value: 1},
    { label: 'Transporte', value: 2},
  ];

  pessoas = [
    { label: 'Roberto Dantas', value: 1 },
    { label: 'Danielli Batista', value: 2 },
    { label: 'Lucas Cajueiro ', value: 3 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  salvar(form: NgForm){
    console.log(form)
  }

}
