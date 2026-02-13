export const custom = {
  sistema: {
    nome: 'Linha Ortho',
    // idGoogleAnalytics: 'GTM-WR67DVM',
    url: '',
    urlPaginaVenda: {
      hmg: 'https://maisdental.com/hmg/ortho-venda/',
      prod: 'https://maisdental.com/ortho-venda/',
    },
    urlFinalizaPedido: {
      hmg: 'https://maisdental.com/hmg/maisdental-finaliza-pedido-v2/ortho/',
      prod: 'https://maisdental.com/ortho-finaliza-pedido/',
    },
    planosValidos: [
      {
        id: 8,
        termoPdf:
          'https://www.maisdental.com/docs/pf/termo-de-aceite-ortho.pdf',
        coberturasPdf:
          'https://maisdental.com/ortho-mais-cobertura-pf/pdf/Cobertura_Plano_Ortho_Mais.pdf',
      },

      {
        id: 11,
        termoPdf:
          'https://www.maisdental.com/docs/pf/termo-de-aceite-ortho-plus.pdf',
        coberturasPdf:
          'https://www.maisdental.com/docs/pf/cobertura/Cobertura_Plano_Ortho_Plus.pdf',
      },
    ],
    carenciasAtivas: [
      {
        valor: 1,
        nome: 'Mensal',
        termoPgto: 'Mensalidade',
        carencia: 'Carência Reduzida',
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
    // icon: 'temas/ortho/assets/icons/icon.png',
    logo: {
      src: 'temas/ortho/assets/img/logo-produto.png',
    },
    imgANS: {
      src: 'temas/ortho/assets/img/ANS_maisDental.png',
    },
    imgEPAO: {
      src: 'temas/ortho/assets/img/EPAO_maisDental.jpg',
    },
    banners: {
      conclusao: {
        desktop: 'temas/ortho/assets/img/banner-conclusao.jpg',
        mobile: 'temas/ortho/assets/img/banner-conclusao-mobile.jpg',
      },
      superior: {
        desktop: 'temas/ortho/assets/img/banner-superior.jpg',
        mobile: 'temas/ortho/assets/img/banner-superior-mobile.jpg',
      },
      mioloRetangular: {
        desktop: 'temas/ortho/assets/img/banner-miolo-retangular.jpg',
        mobile: 'temas/ortho/assets/img/banner-miolo-retangular-mobile.jpg',
      },
      mioloQuadrado: {
        desktop: 'temas/ortho/assets/img/banner-miolo-quadrado-pix.jpg',
        mobile: 'temas/ortho/assets/img/banner-miolo-quadrado-pix_mobile.jpg',
      },
      mioloQuadradoCartao: {
        desktop: 'temas/ortho/assets/img/banner-miolo-quadrado-cartao.jpg',
        mobile:
          'temas/ortho/assets/img/banner-miolo-quadrado-cartao_mobile.jpg',
      },
      mioloQuadradoV2: {
        desktop: 'temas/ortho/assets/img/banner-miolo-quadrado-boleto.jpg',
        mobile:
          'temas/ortho/assets/img/banner-miolo-quadrado-boleto-mobile.jpg',
      },
    },
    tabela: {
      custom: true,
      obs: [
        '***De acordo com o produto escolhido.',
        'Vigência do Contrato: Mínimo 12 meses.',
        '(1) PROMOÇÃO CARENCIA REDUZIDA: Válida para contratação mensal em cartão de crédito e somente a partir da segunda parcela quitada do cartão de crédito. Consulte a tabela de redução de carência disponível no site.',
        '(2) PROMOÇÃO CARÊNCIA ZERO TOTAL: válida somente para a contratação anual, em boleto bancário único ou no cartão de crédito.',
      ],
      normal: [
        {
          periodo: 'CARÊNCIA NORMAL',
          destaque: false,
          procedimentos: [
            { nome: 'Procedimentos', carencia: 'Carência', destaque: false },
            { nome: 'Urgência e emergência', carencia: '24h', destaque: false },
            { nome: 'Ortodontia', carencia: '30 dias', destaque: true },
            {
              nome: '***Documentação Ortodôntica',
              carencia: '30 dias',
              destaque: true,
            },
            {
              nome: 'Manutenção do Aparelho',
              carencia: '30 dias',
              destaque: true,
            },
            { nome: 'Consulta', carencia: '30 dias', destaque: false },
            { nome: 'Radiologia', carencia: '30 dias', destaque: false },
            {
              nome: 'Procedimento Preventivo',
              carencia: '60 dias',
              destaque: false,
            },
            { nome: 'Dentística', carencia: '90 dias', destaque: false },
            {
              nome: 'Cirurgia Oral Menor',
              carencia: '90 dias',
              destaque: false,
            },
            { nome: 'Periodontia', carencia: '120 dias', destaque: false },
            { nome: 'Endodontia', carencia: '120 dias', destaque: false },
            {
              nome: '**Prótese conforme Rol ANS',
              carencia: '180 dias',
              destaque: true,
            },
          ],
        },
        {
          periodo: 'CARÊNCIA ZERO*',
          destaque: true,
          procedimentos: [
            { nome: 'Procedimentos', carencia: 'Carência', destaque: false },
            { nome: 'Urgência e emergência', carencia: '24h', destaque: false },
            { nome: 'Ortodontia', carencia: '24h', destaque: true },
            {
              nome: '***Documentação Ortodôntica',
              carencia: '24h',
              destaque: true,
            },
            { nome: 'Manutenção do Aparelho', carencia: '24h', destaque: true },
            { nome: 'Consulta', carencia: '24h', destaque: false },
            { nome: 'Radiologia', carencia: '24h', destaque: false },
            {
              nome: 'Procedimento Preventivo',
              carencia: '24h',
              destaque: false,
            },
            { nome: 'Dentística', carencia: '24h', destaque: false },
            { nome: 'Cirurgia Oral Menor', carencia: '24h', destaque: false },
            { nome: 'Periodontia', carencia: '24h', destaque: false },
            { nome: 'Endodontia', carencia: '24h', destaque: false },
            {
              nome: '**Prótese conforme Rol ANS',
              carencia: '180 dias',
              destaque: true,
            },
          ],
        },
      ],
    },
  },
};
