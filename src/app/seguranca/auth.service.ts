import { environment } from './../../environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokensRevokeUrl = environment.apiUrl + '/tokens/revoke';
  oauthTokenUrl = environment.apiUrl + '/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) {
      this.carregarToken();
    }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response[`access_token`]);
      })
      .catch(response => {
        if (response.status === 400){

            return  Promise.reject('Usuário ou senha inválida!')

        }
        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(){
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
    .toPromise()
    .then((response: any) => {
      this.armazenarToken(response[`access_token`]);

      console.log('Novo Access token criado!')
      return Promise.resolve(null);
    })
    .catch((response: any) => {
      console.error('Error ao renovar token.', response)
      return Promise.resolve(null);
    })
  }

  limparAccessToken(){
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido(){
    const token = localStorage.getItem('token');

    return !token ||this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string){
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  public armazenarToken(token: string){
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    console.log(this.jwtPayload);

    localStorage.setItem('token', token);
  }

  public carregarToken(){
    const token = localStorage.getItem('token');

    if(token){
      this.armazenarToken(token);
    }
  }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.limparAccessToken();
      });
  }
}
