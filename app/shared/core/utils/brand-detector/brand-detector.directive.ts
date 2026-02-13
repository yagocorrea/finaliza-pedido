import { Directive } from '@angular/core';
import { BandeiraCartaoOption } from '../../models';
import { environment } from 'src/environments/environment';

@Directive({
    selector: '[appBrandDetector]',
    standalone: false
})
export class BrandDetectorDirective {
  constructor() {}

  // Dicionário com prefixos e comprimentos das bandeiras
  private static bandeiras: {
    [key: string]: {
      nome: string;
      img: string;
      habilitado: boolean;
      prefixos: string[];
      comprimentos: number[];
    };
  } = environment.bandeiras;

  static getOptions(): BandeiraCartaoOption[] {
    const options = [
      {
        label: 'Selecione a Bandeira',
        img: '',
        value: '',
      },
    ];
    for (const [bandeira, regras] of Object.entries(this.bandeiras)) {
      const { nome, img, habilitado } = regras;
      if (habilitado) {
        options.push({
          label: nome,
          img: img,
          value: bandeira,
        });
      }
    }
    return options;
  }

  static detectar(numeroCartao: string): string {
    // Remove espaços e verifica se é um número
    numeroCartao = numeroCartao.replace(/\s+/g, '');
    if (!/^\d+$/.test(numeroCartao)) {
      return 'Número inválido';
    }

    // Verificar a bandeira em um único loop
    for (const [bandeira, regras] of Object.entries(this.bandeiras)) {
      const { prefixos, comprimentos, habilitado } = regras;

      // Verificar se o comprimento e o prefixo coincidem
      if (
        habilitado &&
        numeroCartao.length >= 6 &&
        prefixos.some((prefixo) => numeroCartao.startsWith(prefixo))
      ) {
        return bandeira;
      }
    }

    return 'Bandeira desconhecida';
  }
}
