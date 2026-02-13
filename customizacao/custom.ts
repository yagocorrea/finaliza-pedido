export const custom = {
  sistema: {
    nome: 'Linha Tradicional',
    // idGoogleAnalytics: 'GTM-WR67DVM',
    url: '',
    urlPaginaVenda: {
      hmg: 'https://maisdental.com/hmg/venda/',
      prod: 'https://maisdental.com/venda/',
    },
    urlFinalizaPedido: {
      hmg: 'https://maisdental.com/hmg/maisdental-finaliza-pedido-v2/tradicional/',
      prod: 'https://maisdental.com/finaliza-pedido/',
    },
    planosValidos: [
      {
        id: 1,
        termoPdf: 'https://www.maisdental.com/docs/pf/termo-de-aceite.pdf',
        coberturasPdf:
          'https://maisdental.com/planos-pf/dist/pdf/cobertura-Dental-I-Vendas.pdf',
      },
      {
        id: 2,
        termoPdf: 'https://www.maisdental.com/docs/pf/termo-de-aceite.pdf',
        coberturasPdf:
          'https://maisdental.com/planos-pf/dist/pdf/cobertura-Dental-II-Vendas.pdf',
      },
      {
        id: 3,
        termoPdf: 'https://www.maisdental.com/docs/pf/termo-de-aceite.pdf',
        coberturasPdf:
          'https://maisdental.com/planos-pf/dist/pdf/cobertura-Dental-III-Vendas.pdf',
      },
      {
        id: 4,
        termoPdf: 'https://www.maisdental.com/docs/pf/termo-de-aceite.pdf',
        coberturasPdf:
          'https://maisdental.com/planos-pf/dist/pdf/cobertura-Dental-IV-Vendas.pdf',
      },
    ],
    carenciasAtivas: [
      {
        valor: 1,
        nome: 'Mensal',
        termoPgto: 'Mensalidade',
        carencia: 'Carência Padrão',
        isCarenciaZero: false,
        total: 0, // Isso é utilizado para calcular o valor total da proposta nesta carencia
        percentualDesconto: 0, // Isso é utilizado para informar o valor de desconto na proposta nesta carencia
      },
      {
        valor: 6,
        nome: 'Semestral',
        termoPgto: 'Semestralidade',
        carencia: 'Carência Reduzida',
        isCarenciaZero: false,
        total: 0, // Isso é utilizado para calcular o valor total da proposta nesta carencia
        percentualDesconto: 0, // Isso é utilizado para informar o valor de desconto na proposta nesta carencia
      },
      {
        valor: 12,
        nome: 'Anual',
        termoPgto: 'Anualidade',
        carencia: 'Carência Zero',
        isCarenciaZero: true,
        total: 0, // Isso é utilizado para calcular o valor total da proposta nesta carencia
        percentualDesconto: 0, // Isso é utilizado para informar o valor de desconto na proposta nesta carencia
      },
    ],
    // icon: 'temas/implante/assets/icons/icon.png',
    logo: {
      src: 'temas/invisivel/assets/img/logo-produto.png',
    },
    imgANS: {
      src: 'temas/invisivel/assets/img/ANS_maisDental.png',
    },
    imgEPAO: {
      src: 'temas/invisivel/assets/img/EPAO_maisDental.jpg',
    },

    banners: {
      conclusao: {
        desktop: 'temas/tradicional/assets/img/banner-conclusao.jpg',
        mobile: 'temas/tradicional/assets/img/banner-conclusao-mobile.jpg',
      },
      superior: {
        desktop: 'temas/tradicional/assets/img/banner-superior.jpg',
        mobile: 'temas/tradicional/assets/img/banner-superior-mobile.jpg',
      },
      mioloRetangular: {
        desktop: 'temas/tradicional/assets/img/banner-miolo-retangular.jpg',
        mobile:
          'temas/tradicional/assets/img/banner-miolo-retangular-mobile.jpg',
      },
      mioloQuadrado: {
        desktop: 'temas/tradicional/assets/img/banner-miolo-quadrado-pix.jpg',
        mobile: 'temas/tradicional/assets/img/banner-miolo-quadrado-pix_mobile.jpg',
      },
      mioloQuadradoCartao: {
        desktop: 'temas/tradicional/assets/img/banner-miolo-quadrado-cartao.jpg',
        mobile: 'temas/tradicional/assets/img/banner-miolo-quadrado-cartao_mobile.jpg',
      },
      mioloQuadradoV2: {
        desktop: 'temas/tradicional/assets/img/banner-miolo-quadrado-boleto.jpg',
        mobile:
          'temas/tradicional/assets/img/banner-miolo-quadrado-boleto-mobile.jpg',
      },
    },

    tabela: {
      custom: false,
      obs: ['Vigência do Contrato: Mínimo 12 meses.'],
      normal: [
        {
          periodo: 'PAGAMENTO MENSAL',
          destaque: false,
          procedimentos: [
            { nome: 'Procedimentos', carencia: 'Carência', destaque: false },
            { nome: 'Urgência e emergência', carencia: '24h', destaque: false },
            { nome: 'Consulta', carencia: '30 dias', destaque: false },
            {
              nome: 'Radiologia',
              carencia: '60 dias',
              destaque: false,
            },
            {
              nome: 'Proc. Preventivo',
              carencia: '60 dias',
              destaque: false,
            },
            { nome: 'Dentística', carencia: '90 dias', destaque: false },
            { nome: 'Periodontia', carencia: '120 dias', destaque: false },
            {
              nome: 'Endodontia',
              carencia: '120 dias',
              destaque: false,
            },
            { nome: 'Prótese', carencia: '180 dias', destaque: false },
            {
              nome: 'Cirurgia',
              carencia: '90 dias',
              destaque: false,
            },
            {
              nome: 'Clareamento com moldeira (Gel + Moldeira) Dental III',
              carencia: '90 dias',
              destaque: false,
            },
            {
              nome: 'Clareamento em consultório Dental IV',
              carencia: '90 dias',
              destaque: false,
            },
            {
              nome: 'Ortodontia Dental IV',
              carencia: '30 dias',
              destaque: false,
            },
            {
              nome: 'Ortodontia Dental III',
              carencia: '30 dias',
              destaque: true,
            },
          ],
        },
        {
          periodo: 'PAGAMENTO SEMESTRAL',
          destaque: false,
          procedimentos: [
            { nome: 'Procedimentos', carencia: 'Carência', destaque: false },
            { nome: 'Urgência e emergência', carencia: '24h', destaque: false },
            { nome: 'Consulta', carencia: '30 dias', destaque: false },
            {
              nome: 'Radiologia',
              carencia: '30 dias',
              destaque: false,
            },
            {
              nome: 'Proc. Preventivo',
              carencia: '30 dias',
              destaque: false,
            },
            { nome: 'Dentística', carencia: '60 dias', destaque: false },
            { nome: 'Periodontia', carencia: '90 dias', destaque: false },
            {
              nome: 'Endodontia',
              carencia: '90 dias',
              destaque: false,
            },
            { nome: 'Prótese', carencia: '150 dias', destaque: false },
            {
              nome: 'Cirurgia',
              carencia: '90 dias',
              destaque: false,
            },
            {
              nome: 'Clareamento com moldeira (Gel + Moldeira) Dental III',
              carencia: '60 dias',
              destaque: false,
            },
            {
              nome: 'Clareamento em consultório Dental IV',
              carencia: '60 dias',
              destaque: false,
            },
            {
              nome: 'Ortodontia Dental IV',
              carencia: '30 dias',
              destaque: false,
            },
            {
              nome: 'Ortodontia Dental III',
              carencia: '30 dias',
              destaque: true,
            },
          ],
        },
        {
          periodo: 'PAGAMENTO ANUAL',
          destaque: true,
          procedimentos: [
            { nome: 'Procedimentos', carencia: 'Carência', destaque: false },
            { nome: 'Urgência e emergência', carencia: '24h', destaque: false },
            { nome: 'Consulta', carencia: '24h', destaque: false },
            {
              nome: 'Radiologia',
              carencia: '24h',
              destaque: false,
            },
            {
              nome: 'Proc. Preventivo',
              carencia: '24h',
              destaque: false,
            },
            { nome: 'Dentística', carencia: '24h', destaque: false },
            { nome: 'Periodontia', carencia: '24h', destaque: false },
            {
              nome: 'Endodontia',
              carencia: '24h',
              destaque: false,
            },
            { nome: '**Prótese', carencia: '180 dias', destaque: false },
            {
              nome: 'Cirurgia',
              carencia: '24h',
              destaque: false,
            },
            {
              nome: 'Clareamento com moldeira (Gel + Moldeira) Dental III',
              carencia: '24h',
              destaque: false,
            },
            {
              nome: 'Clareamento em consultório Dental IV',
              carencia: '24h',
              destaque: false,
            },
            {
              nome: 'Ortodontia Dental IV',
              carencia: '24h',
              destaque: false,
            },
            {
              nome: 'Ortodontia Dental III',
              carencia: '24h',
              destaque: true,
            },
          ],
        },
      ],
    },
  },
};
