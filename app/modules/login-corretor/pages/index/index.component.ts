import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendaService } from 'src/app/shared/core/services/api/venda/venda.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  standalone: false
})
export class IndexComponent {
  carregando = false;
  corretor: any = {};
  paginaCorretor: any = {
    hasCorretor: false,
    notFound: false
  };
  animateformPai = '';

  constructor(
    private vendaService: VendaService,
    private router: Router
  ) {}

  buscarCorretor() {
    if (!this.corretor.cpf || this.carregando) return;

    this.carregando = true;
    this.paginaCorretor.notFound = false;

    this.vendaService.buscaCorretor(this.corretor.cpf)
      .subscribe({
        next: (retorno) => {
          if (retorno?.success && retorno.data) {
            this.paginaCorretor.hasCorretor = true;
            this.router.navigate(['simulacao']);
          } else {
            this.paginaCorretor.notFound = true;
          }
        },
        complete: () => (this.carregando = false)
      });
  }

  irCadastroCorretor() {
    window.open('https://app.enoss.com.br/login', '_blank');
  }
}