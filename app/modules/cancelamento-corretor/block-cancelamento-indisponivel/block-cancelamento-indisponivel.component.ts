import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-block-cancelamento-indisponivel',
    templateUrl: './block-cancelamento-indisponivel.component.html',
    styleUrls: ['./block-cancelamento-indisponivel.component.scss'],
    standalone: false
})
export class BlockCancelamentoIndisponivelComponent implements OnInit {

  @Input() statusProposta: number | undefined;

  constructor() {}

  ngOnInit(): void {

  }
}
