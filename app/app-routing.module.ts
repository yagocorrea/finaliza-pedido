import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

let rotas: Routes = [
  {
    path: 'erro',
    pathMatch: 'full',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/erro/erro.module').then((m) => m.ErroModule),
      },
    ],
  },
  {
    path: 'nao-encontrado',
    pathMatch: 'full',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/nao-encontrado/nao-encontrado.module').then(
            (m) => m.NaoEncontradoModule
          ),
      },
    ],
  },
  {
    path: 'login-corretor',
    pathMatch: 'full',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/login-corretor/login-corretor.module').then(
            (m) => m.LoginCorretorModule
          ),
      },
    ],
  },
  {
    path: 'proposta-concluida',
    pathMatch: 'full',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/proposta-concluida/proposta-concluida.module').then(
            (m) => m.PropostaConcluidaModule
          ),
      },
    ],
  },
  {
    path: 'corretor',
    children: [
      {
        path: ':uid',
        children: [
          {
            path: 'escolha-tempo-carencia',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import(
                    './modules/escolha-tempo-carencia/escolha-tempo-carencia.module'
                  ).then((m) => m.EscolhaTempoCarenciaModule),
              },
            ],
          },
          {
            path: 'escolha-forma-pagamento',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import(
                    './modules/escolha-forma-pagamento/escolha-forma-pagamento.module'
                  ).then((m) => m.EscolhaFormaPagamentoModule),
              },
            ],
          },
          {
            path: 'conclusao',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('./modules/conclusao/conclusao.module').then(
                    (m) => m.ConclusaoModule
                  ),
              },
            ],
          },
          {
            path: 'finalize-seu-pagamento',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import(
                    './modules/finalize-seu-pagamento/finalize-seu-pagamento.module'
                  ).then((m) => m.FinalizeSeuPagamentoModule),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: ':uid',
    children: [
      {
        path: 'escolha-tempo-carencia',
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                './modules/escolha-tempo-carencia/escolha-tempo-carencia.module'
              ).then((m) => m.EscolhaTempoCarenciaModule),
          },
        ],
      },
      {
        path: 'escolha-forma-pagamento',
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                './modules/escolha-forma-pagamento/escolha-forma-pagamento.module'
              ).then((m) => m.EscolhaFormaPagamentoModule),
          },
        ],
      },
      {
        path: 'conclusao',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./modules/conclusao/conclusao.module').then(
                (m) => m.ConclusaoModule
              ),
          },
        ],
      },
      {
        path: 'finalize-seu-pagamento',
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                './modules/finalize-seu-pagamento/finalize-seu-pagamento.module'
              ).then((m) => m.FinalizeSeuPagamentoModule),
          },
        ],
      },
    ],
  },
  {
    path: 'cancelamento-corretor',
    children: [
      {
        path: ":uid",
        loadChildren: () =>
          import(
            './modules/cancelamento-corretor/cancelamento-corretor.module'
          ).then((m) => m.CancelamentoCorretorModule),
      }
    ]
  },
  {
    path: 'reativar-proposta',
    children: [
      {
        path: ":uid",
        loadChildren: () =>
          import(
            './modules/reativar-proposta/reativar-proposta.module'
          ).then((m) => m.ReativarPropostaModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'nao-encontrado',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(rotas, {
      onSameUrlNavigation: 'reload',
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  static obterRotas = {};
}
