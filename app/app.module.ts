import {
  CUSTOM_ELEMENTS_SCHEMA,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoadingInterceptor } from './shared/component/loading/loading.interceptor';
import { NOTYF, notyfFactory } from './shared/core/utils';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxMaskDirective,
    SharedModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    PdfViewerModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-br',
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'R$ ' },
    provideHttpClient(withInterceptorsFromDi()),
    provideNgxMask(),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: NOTYF, useFactory: notyfFactory },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
