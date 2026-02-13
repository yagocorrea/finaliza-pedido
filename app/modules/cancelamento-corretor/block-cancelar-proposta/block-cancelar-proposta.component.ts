import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { StorageEnum } from "src/app/shared/core/enum";
import { Corretor, Proposta } from "src/app/shared/core/models";
import { StorageService } from "src/app/shared/core/services/storage/storage.service";

@Component({
    selector: 'app-block-cancelar-proposta',
    styleUrls: ['./block-cancelar-proposta.component.scss'],
    templateUrl: './block-cancelar-proposta.component.html',
    standalone: false
})
export class BlockCancelarPropostaComponent implements OnInit {

  @Input() proposta: Proposta | null = null;
  @Input() corretor: Corretor | null = null;
  @Output() cancelarPropostaEmmiter = new EventEmitter();

  checkboxAceite = new FormControl;
  aptaCancelamento: boolean = true;

  constructor() {}

  ngOnInit(): void {
    // console.log('proposta tela cancelamento:', this.proposta);
    // console.log('corretor tela cancelamento:', this.corretor);
  }

  handleCancelarProposta() {
    this.cancelarPropostaEmmiter.emit();
  }
}
