import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private MessageService: MessageService) { }

  handle(errorResponse: any){
    let msg: string;

    if (typeof errorResponse === 'string'){
      msg = errorResponse;
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }
    this.MessageService.add({ severity: 'error', detail: msg })
  }
}
