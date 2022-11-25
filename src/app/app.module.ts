import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

import { CoreModule } from './core/core.module';
import { ConfirmationService, MessageService } from 'primeng/api';

import { TranslateService  } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.modules';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    LancamentosModule,
    PessoasModule,
    CoreModule,
    AppRoutingModule


  ],
  providers: [
    MessageService,
    ConfirmationService,
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
