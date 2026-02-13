import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCorretorRoutingModule } from './login-corretor-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    LoginCorretorRoutingModule,
    FormsModule
  ]
})
export class LoginCorretorModule { }
