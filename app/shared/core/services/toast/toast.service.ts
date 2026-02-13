import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Notyf } from 'notyf';
import { NOTYF } from '../../utils';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(
    private toastr: ToastrService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  Warning(msg: string) {
    this.toastr.warning(msg, 'Aviso!');
  }

  InfoWarning(msg: string) {
    this.notyf.open({
      type: 'info-warning',
      message: msg,
    });
  }

  Error(msg?: string) {
    const title = 'Ops! Ocorreu um erro ao realizar esta operação';
    let message =
      'Parece que nossos servidores estão cheios, por favor, tente novamente mais tarde.';
    if (msg) {
      message = msg.replace('Erro:', '');
      let list = message.split('/');

      const findIndexDbContext = list.findIndex((el) =>
        el.includes('DbContext')
      );
      if (findIndexDbContext !== -1) {
        list.splice(findIndexDbContext, 1);
        list.push('Não foi possível concluir a operação anterior antes desta.');
      }

      message = list.join('. ');
      message = message.replace(' .', '.').trim();
    }
    this.toastr.error(message, title);
  }

  ErrorFinalizaProposta(msg?: string) {
    const title = 'Problemas ao finalizar a proposta';
    let message = 'Erro indeterminado';
    if (msg) {
      message = msg;
    }
    this.toastr.error(message, title);
  }
}
