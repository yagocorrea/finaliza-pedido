export const custom = {
  sistema: {
    nome: 'Linha Implante',
    // idGoogleAnalytics: 'GTM-WR67DVM',
    url: '',
    urlPaginaVenda: {
      hmg: 'https://maisdental.com/hmg/implante-venda/',
      prod: 'https://maisdental.com/implante-venda/',
    },
    urlFinalizaPedido: {
      hmg: 'https://maisdental.com/hmg/maisdental-finaliza-pedido-v2/implante/',
      prod: 'https://maisdental.com/implante-finaliza-pedido/',
    },
    planosValidos: [
      {
        id: 9,
        termoPdf:
          'https://www.maisdental.com/docs/pf/termo-de-aceite-implante.pdf',
        coberturasPdf:
          'https://maisdental.com/implantes-cobertura-pf/pdf/Cobertura_Dental_Implante_I.pdf',
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
        carencia: 'Carência Padrão',
        isCarenciaZero: false,
        total: 0, // Isso é utilizado para calcular o valor total da proposta nesta carencia
        percentualDesconto: 0, // Isso é utilizado para informar o valor de desconto na proposta nesta carencia
      },
      {
        valor: 12,
        nome: 'Anual',
        termoPgto: 'Anualidade',
        carencia: 'Carência Padrão',
        isCarenciaZero: false,
        total: 0, // Isso é utilizado para calcular o valor total da proposta nesta carencia
        percentualDesconto: 0, // Isso é utilizado para informar o valor de desconto na proposta nesta carencia
      },
    ],

    // icon: 'temas/implante/assets/icons/icon.png',
    logo: {
      src: 'temas/implante/assets/img/logo-produto.png',
    },
    imgANS: {
      src: 'temas/implante/assets/img/ANS_maisDental.png',
    },
    imgEPAO: {
      src: 'temas/implante/assets/img/EPAO_maisDental.jpg',
    },
    banners: {
      conclusao: {
        desktop: 'temas/implante/assets/img/banner-conclusao.jpg',
        mobile: 'temas/implante/assets/img/banner-conclusao-mobile.jpg',
      },
      superior: {
        desktop: 'temas/implante/assets/img/banner-superior.jpg',
        mobile: 'temas/implante/assets/img/banner-superior-mobile.jpg',
      },
      mioloRetangular: {
        desktop: 'temas/implante/assets/img/banner-miolo-retangular.jpg',
        mobile: 'temas/implante/assets/img/banner-miolo-retangular-mobile.jpg',
      },
      mioloQuadrado: {
        desktop: 'temas/implante/assets/img/banner-miolo-quadrado-pix.jpg',
        mobile: 'temas/implante/assets/img/banner-miolo-quadrado-pix_mobile.jpg',
      },
      mioloQuadradoCartao: {
        desktop: 'temas/implante/assets/img/banner-miolo-quadrado-cartao.jpg',
        mobile: 'temas/implante/assets/img/banner-miolo-quadrado-cartao_mobile.jpg',
      },
      mioloQuadradoV2: {
        desktop: 'temas/implante/assets/img/banner-miolo-quadrado-boleto.jpg',
        mobile: 'temas/implante/assets/img/banner-miolo-quadrado-boleto-mobile.jpg',
      },
    },

    tabela: {
      custom: false,
      obs: [
        '* Prótese em porcelana realizada exclusivamente pelo mesmo implantodontista, referenciado pela MaisDental, que realizou o implante unitário.',
        'Vigência do Contrato: Mínimo 12 meses.',
      ],
      normal: [
        {
          periodo: 'MENSAL',
          destaque: false,
          procedimentos: [
            { nome: 'Procedimentos', carencia: 'Carência', destaque: false },
            { nome: 'Urgência e emergência', carencia: '24h', destaque: false },
            { nome: 'Consulta', carencia: '1 mês', destaque: false },
            { nome: 'Radiologia', carencia: '1 mês', destaque: false },
            {
              nome: 'Procedimento Preventivo',
              carencia: '1 mês',
              destaque: false,
            },
            { nome: 'Dentística', carencia: '2 meses', destaque: false },
            { nome: 'Periodontia', carencia: '3 meses', destaque: false },
            { nome: 'Endodontia', carencia: '3 meses', destaque: false },
            {
              nome: 'Cirurgia Oral Menor',
              carencia: '3 meses',
              destaque: false,
            },
            {
              nome: 'Prótese conforme Rol ANS',
              carencia: '5 meses',
              destaque: true,
            },
            {
              nome: 'Enxerto Ósseo',
              carencia: '12 meses',
              destaque: true,
            },
            {
              nome: 'Tomografia Computadorizada',
              carencia: '12 meses',
              destaque: true,
            },
            {
              nome: 'Cirurgia (Implante Unitário)',
              carencia: '12 meses',
              destaque: true,
            },
            {
              nome: 'Prótese sobre implante em porcelana *',
              carencia: '12 meses',
              destaque: true,
            },
          ],
        },
      ],
    },
  },
};
