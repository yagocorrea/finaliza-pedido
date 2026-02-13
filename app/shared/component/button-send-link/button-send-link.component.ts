import { Component, DoCheck } from '@angular/core';
import { StorageService } from '../../core/services/storage/storage.service';
import { PropostaService } from '../../core/services/api/proposta/proposta.service';
import { Proposta, Response } from '../../core/models';
import { RouterEnum, StorageEnum } from '../../core/enum';
import { ToastService } from '../../core/services/toast/toast.service';
import { RouterService } from '../../core/services/router/router.service';

@Component({
    selector: 'app-button-send-link',
    templateUrl: './button-send-link.component.html',
    styleUrls: ['./button-send-link.component.scss'],
    standalone: false
})
export class ButtonSendLinkComponent implements DoCheck {
  proposta: Proposta | null = null;
  constructor(
    private storageService: StorageService,
    private propostaService: PropostaService,
    private routerService: RouterService,
    private toast: ToastService
  ) {}

  ngDoCheck(): void {
    this.proposta = this.storageService.getData(StorageEnum.Proposta);
  }

  onSave(value: Response<boolean>, storage: StorageService) {
    if (value.success) {
      storage.saveData(StorageEnum.EnviaEmail, value.data);
      this.routerService.goTo(RouterEnum.CONCLUSAO);
    } else {
      this.toast.Warning('Não foi possível enviar o link da proposta.');
    }
  }

  EnviaEmail() {
    if (this.proposta) {
      this.propostaService.EnviaEmail(this.proposta.uid).subscribe({
        next: (value) => {
          this.onSave(value, this.storageService);
        },
        error: (err) => {
          const msg = err.error.errors ?? err.error;
          this.toast.Error(msg);
        },
      });
    }
  }
}
