import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterEnum, StorageEnum } from '../../enum';
import { StorageService } from '../storage/storage.service';

@Injectable({ providedIn: 'root' })
export class RouterService {
  private isVisaoCorretor: boolean = false;
  constructor(private router: Router, private storageService: StorageService) {}

  enableVisaoCorretor() {
    this.isVisaoCorretor = true;
  }
  disableVisaoCorretor() {
    this.isVisaoCorretor = false;
  }

  getVisaoCorretor() {
    return this.isVisaoCorretor;
  }

  goTo(route: RouterEnum) {
    const url: any[] = [route];
    const uid = this.storageService.getData<string>(StorageEnum.UID);
    if (uid) {
      url.unshift(uid);
    }
    if (this.isVisaoCorretor) {
      url.unshift('corretor');
    }
    this.router.navigate(url);
  }

  goToErrorPage() {
    this.storageService.removeAll();
    this.router.navigate(['erro']);
  }

  goToError404Page() {
    this.storageService.removeAll();
    this.router.navigate(['nao-encontrado']);
  }

  goToPropostaConcluidaPage() {
    this.storageService.removeAll();
    this.router.navigate(['proposta-concluida']);
  }
}
