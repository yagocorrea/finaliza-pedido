import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';

let rotas: Routes = [
  {
    path: '',
    component: IndexComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(rotas),
  ]
})
export class LoginCorretorRoutingModule {
    
}