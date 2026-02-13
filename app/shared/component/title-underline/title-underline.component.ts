import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-title-underline',
    templateUrl: './title-underline.component.html',
    styleUrls: ['./title-underline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class TitleUnderlineComponent {
  @Input() title: string = '';

  constructor() {}
}
