import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { CategoriasService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { LancamentoService } from './../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  categorias: any[] = [];
  pessoas:any[] = [];
  // lancamento: Lancamento = new Lancamento();

  formulario!: FormGroup;

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  constructor(
    private categoriaService: CategoriasService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.title.setTitle('Novo lançamento');

    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento && codigoLancamento !== 'novo'){
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required ],
      dataVencimento: [null, Validators.required ],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: []
    })
  }

  get editando(){
    return Boolean (this.formulario.get('codigo')?.value);
  }

  carregarLancamento(codigo: number){
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
       // this.lancamento = lancamento;
       this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(){
    if(this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento(){
    this.lancamentoService.adicionar(this.formulario.value)
      .then((lancamentoAdicionado) => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

        //form.reset();
        //this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado?.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then((lancamento: Lancamento) => {
        // this.lancamento = lancamento;
        this.formulario.patchValue(lancamento)

        this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso!' });
        this.atualizarTituloEdicao();
      }
      ).catch(erro => this.errorHandler.handle(erro))
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

  novo(){
    this.formulario.reset();
    this.formulario.patchValue(new Lancamento());
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao')?.value}`);
  }
}
