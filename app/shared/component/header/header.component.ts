import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { custom } from 'src/customizacao/custom';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit{
    custom = custom;

    ngOnInit() {}
}

  


