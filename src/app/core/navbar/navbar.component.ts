import { Router } from '@angular/router';
import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;
  usuarioLogado: string = ''

  constructor(
    private auth: AuthService,
    private errorHandle: ErrorHandlerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }

  temPermissao(permissao: string){
    return this.auth.temPermissao(permissao)
  }

  criarNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }

  logout(){
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandle.handle(erro));
  }

}
