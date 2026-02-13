// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { custom } from 'src/customizacao/custom';

export const environment = {
  production: false,
  host: '//localhost:44668',
  hostApiCompletaCep: '//consulta-api.hmg.marlin.com.br/api/v2/recap/enderecos',
  hostApiBuscaMunicipio:
    '//consulta-api.hmg.marlin.com.br/api/v2/recap/municipios/lista',
  hostApiCompletaCpf: '//consulta-api.hmg.marlin.com.br/api/v2/recap/cpfs',
  // tokenConsultaToolkit: custom.sistema.apiCpf.token,
  ativarAutoCompleteCpf: true,
  disabilitarCamposCompletadosPorCPF: true,
  urlBasePaginaVenda: custom.sistema.urlPaginaVenda.hmg,
  urlFinalizaPedido: custom.sistema.urlFinalizaPedido.hmg,
  planosValidos: custom.sistema.planosValidos,
  endpoints: {
    produto: {
      taxaBancaria: '/api/Produto/5',
    },

    corretor: {
      getById: '/api/Corretor/',
    },

    proposta: {
      getByUid: '/api/Proposta/GetByUid?uid=',
      finalizaPedido: '/api/Proposta/CreatePagamentoProposta',
      enviaEmail: '/api/Proposta/EnviarEmailPagamento?uid=',
      consultaPgtoPix: '/api/Proposta/ConsultarPagamentoPix?uid=',
      alterarCicloPgto: '/api/Proposta/AlterarCicloPagamento',
      reiniciarStatusProposta:
        '/api/Proposta/AlterarParaAguardandoFormaPagamento',
      atualizarStatusProposta: '/api/Proposta/AtualizarStatusProposta',
      alterarCartao: '/api/Proposta/AtualizaCartaoCredito',
      clonarPropostaPixCancelada: '/api/Proposta/ClonarPropostaPixCancelada?uid='
    },

    atributo: {
      associaAtributoProposta: '/api/atributo/AssociaAtributoProposta',
    },

    login: {
      // usuario: '/contratos/procurarPorClientePortal',
      usuario: '/api/v2.0/usuarios/login',
    },
    administradora: {
      profissao: '/administradora/profissao',
    },
    estadoCivil: {
      estadoCivil: '/api/v1/estadoCivil',
    },
    parentesco: {
      parentesco: '/api/v2.0/parentesco/parentescos',
    },
  },
  recaptchaSiteKey: '6LdFqd8bAAAAAKkjZ2q1Z9EdG5FAxRMsgXVcVKvs',
  bandeiras: {
    visa: {
      nome: 'Visa',
      img: 'assets/img/bandeira_cartao/visa.svg',
      habilitado: true,
      prefixos: ['4'],
      comprimentos: [13, 16, 19],
    },
    master: {
      nome: 'Mastercard',
      img: 'assets/img/bandeira_cartao/mastercard.svg',
      habilitado: true,
      prefixos: [
        ...Array.from({ length: 5 }, (_, i) => (51 + i).toString()),
        ...Array.from({ length: 500 }, (_, i) => (2221 + i).toString()),
      ],
      comprimentos: [16],
    },
    americanExpress: {
      nome: 'American Express',
      img: 'assets/img/bandeira_cartao/amex.svg',
      habilitado: false,
      prefixos: ['34', '37'],
      comprimentos: [15],
    },
    diners: {
      nome: 'Diners Club',
      img: 'assets/img/bandeira_cartao/diners.svg',
      habilitado: false,
      prefixos: ['36', '38', '39'],
      comprimentos: [14, 16],
    },
    elo: {
      nome: 'Elo',
      img: 'assets/img/bandeira_cartao/elo.svg',
      habilitado: true,
      prefixos: [
        '5067',
        '509',
        '627780',
        '636297',
        '636368',
        '438935',
        '451416',
        '504175',
        '506699',
        '50900',
        '636120',
      ],
      comprimentos: [16],
    },
    hipercard: {
      nome: 'Hipercard',
      img: 'assets/img/bandeira_cartao/hipercard.svg',
      habilitado: false,
      prefixos: ['606282', '3841'],
      comprimentos: [16, 19],
    },
    jcb: {
      nome: 'JCB',
      img: 'assets/img/bandeira_cartao/jcb.svg',
      habilitado: false,
      prefixos: Array.from({ length: 62 }, (_, i) => (3528 + i).toString()),
      comprimentos: [16, 19],
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
