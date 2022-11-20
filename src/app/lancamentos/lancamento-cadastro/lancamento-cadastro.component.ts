import { MessageService } from 'primeng/api';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';

import { CategoriasService } from '../../categorias/categoria.service';
import { Lancamento } from './../../core/model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  categorias: any[] = [];
  pessoas:any[] = [];
  lancamento: Lancamento = new Lancamento();

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  constructor(
    private categoriaService: CategoriasService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: NgForm ){
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
      console.log(this.lancamento)
  }

carregarCategorias(){
  return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map((c: any)  => ({label: c.nome, value: c.codigo }));
      })
    .catch(erro => this.errorHandler.handle(erro));
}

carregarPessoas(){
  return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map((p: any)  => ({label: p.nome, value: p.codigo }));
      })
    .catch(erro => this.errorHandler.handle(erro));
}

}
