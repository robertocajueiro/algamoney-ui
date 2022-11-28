import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';

import { SegurancaRoutingModule } from './seguranca-routing.module';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    }),

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  providers: [JwtHelperService]
})
export class SegurancaModule { }
