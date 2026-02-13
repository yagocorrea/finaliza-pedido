import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { custom } from 'src/customizacao/custom';
import { Corretor, Proposta } from '../../core/models';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent implements OnInit {
  custom = custom;
  currentYear = new Date().getFullYear();
  @Input() proposta: Proposta | undefined;
  @Input() corretor: Corretor | undefined;

  constructor() {}
  ngOnInit() {}
}
