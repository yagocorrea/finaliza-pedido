import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-button-navigate',
    templateUrl: './button-navigate.component.html',
    styleUrls: ['./button-navigate.component.scss'],
    standalone: false
})
export class ButtonNavigateComponent {
  @Input() typeBtn: 'submit' | 'reset' | 'button' | undefined;
  @Input() buttonText: string = '';
  @Input() buttonClass: string = '';
  @Input() buttonClassDynamic: string | object = '';
  @Input() isDisabled: boolean = false;

  @Output() onClickEmitter = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  isCurrentRouter(router: string): boolean {
    return this.router.url.includes(router);
  }

  clickHandler() {
    this.onClickEmitter.emit();
  }
}
