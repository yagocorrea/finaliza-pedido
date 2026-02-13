import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-page-button-back-page',
    templateUrl: './button-back-page.component.html',
    styleUrls: ['./button-back-page.component.scss'],
    standalone: false
})
export class BtnBackPageComponent {
  showButton: boolean = true;
  @Output() onClickEmitter = new EventEmitter();

  constructor(private location: Location) {}

  ngOnInit(): void {}

  clickHandler() {
    this.onClickEmitter.emit();
    window.scrollTo(0, 0);
  }
}
