import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-recaptcha',
    templateUrl: './recaptcha.component.html',
    styleUrls: ['./recaptcha.component.scss'],
    standalone: false
})
export class RecaptchaComponent implements OnInit {
  @Output() setRecapthaCheckedEmitter = new EventEmitter<string>();
  key: string = environment.recaptchaSiteKey;
  token: string | undefined;

  constructor() {
    this.token = undefined;
  }

  ngOnInit(): void {}

  onTokenChange(token: string | undefined): void {
    this.token = token;
    this.setRecapthaCheckedEmitter.emit(token);
  }
}
