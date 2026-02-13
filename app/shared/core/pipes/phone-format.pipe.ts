import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneFormat',
    standalone: false
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    value = value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    
    if (value.length === 10) {
      // Formato (XX) XXXX-XXXX
      return `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
    } else if (value.length === 11) {
      // Formato (XX) XXXXX-XXXX
      return `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
    }

    return value; // Retorna sem formatação se não tiver o tamanho esperado
  }

}
