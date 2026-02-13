import { Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
    selector: '[appCustomValidator]',
    standalone: false
})
export class CustomValidatorDirective {
  constructor() {}

  static validadeCartao(control: AbstractControl) {
    if (control.value) {
      const values = control.value.split('/');
      const currentMonth = new Date().getMonth();

      const date = new Date().getFullYear();
      const twoDigitsCurrentYear = date - 2000;

      // verifica se a data não é menor que a atual
      // verifica se o mês é valido
      // verifica se o ano atual é maior que o digitado
      // verifica se o ano possui 2 digitos
      if (
        (Number(values[0]) < (currentMonth + 1) && twoDigitsCurrentYear === Number(values[1])) ||
        (Number(values[0]) < 1 || Number(values[0]) > 12) ||
        (twoDigitsCurrentYear > parseInt(values[1])) ||
        values[1]?.length < 2
      ) {
        return {
          dataInvalida: true,
        };
      }
    }

    return null;
  }

  static nomeCartao(control: AbstractControl) {
    if (control.value) {
      const nome = control.value.trim();
      if (nome.length === 0) {
        return {
          nomeInvalido: true,
        };
      }
    }

    return null;
  }

  static cvvCartao(control: AbstractControl) {
    if (control.value) {
      if (!/^\d{3,4}$/.test(control.value)) {
        return {
          cvvInvalida: true,
        };
      }
    }

    return null;
  }

  static numeroCartaoCretito(control: AbstractControl) {
    if (control.value) {
      let value = control.value;
      // accept only digits, dashes or spaces
      if (/[^0-9-\s]+/.test(value)) {
        return {
          numeroCartaoInvalido: true,
        };
      }

      // The Luhn Algorithm. It's so pretty.
      var nCheck = 0,
        nDigit = 0,
        bEven = false;
      value = value.replace(/\D/g, '');

      for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
          nDigit = parseInt(cDigit, 10);

        if (bEven) {
          if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
      }

      if (nCheck % 10 == 0) {
        return null;
      } else {
        return {
          numeroCartaoInvalido: true,
        };
      }
    }

    return null;
  }

  static sameNumbers(control: AbstractControl) {
    let v: string = control.value;
    let counter: number = 1;

    for(let i = 0; i <= v.length; i++) {
      if(i != 0)
        if(v[i] === v[i-1]) counter++;
    }

    if(parseInt(control.value.replaceAll(" ", "")) === 0 || counter == v.length)
      return {
        numeroCartaoZerado: true,
      }
    else
      return null;

  }

  static allZeroNumbers(control: AbstractControl) {
    let v: string = control.value;

    if(parseInt(control.value.replaceAll(" ", "")) === 0)
      return {
        numeroCvvZerado: true,
      }
    else
      return null;
  }
}
