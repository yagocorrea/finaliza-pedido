import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoadingInterceptor } from './component/loading/loading.interceptor';
import { LoadingService } from './component/loading/loading.service';
import { LoadingComponent } from './component/loading/loading.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { BlockResumoVidaValorComponent } from './component/block-resumo-vida-valor/block-resumo-vida-valor.component';
import { BlockResumoTitularComponent } from './component/block-resumo-titular/block-resumo-titular.component';
import { BlockResumoCompraComponent } from './component/block-resumo-compra/block-resumo-compra.component';
import { PhoneFormatPipe } from './core/pipes/phone-format.pipe';
import { BtnBackPageComponent } from './component/button-back-page/button-back-page.component';
import {
  RECAPTCHA_SETTINGS,
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
  RecaptchaV3Module,
} from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';
import { RecaptchaComponent } from './component/recaptcha/recaptcha.component';
import { environment } from 'src/environments/environment';
import { ButtonNavigateComponent } from './component/button-navigate/button-navigate.component';
import { ButtonSendLinkComponent } from './component/button-send-link/button-send-link.component';
import { DialogPdfComponent } from './component/dialog-pdf/dialog-pdf.component';
import { TitleUnderlineComponent } from './component/title-underline/title-underline.component';
import { CardResumoValorComponent } from './component/card-resumo-valor/card-resumo-valor.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BlockResumoVidaValorComponent,
    BlockResumoTitularComponent,
    FormsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    RecaptchaV3Module,
    DialogPdfComponent,
  ],

  declarations: [
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
    BlockResumoCompraComponent,
    CardResumoValorComponent,
    PhoneFormatPipe,
    BtnBackPageComponent,
    RecaptchaComponent,
    ButtonNavigateComponent,
    ButtonSendLinkComponent,
    TitleUnderlineComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,

      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptchaSiteKey,
      // useValue: {
      //   siteKey: environment.recaptchaSiteKey,
      // } as RecaptchaSettings,
    },
    LoadingService,
  ],

  exports: [
    LoadingComponent,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    BlockResumoVidaValorComponent,
    BlockResumoTitularComponent,
    BlockResumoCompraComponent,
    PhoneFormatPipe,
    BtnBackPageComponent,
    RecaptchaComponent,
    ButtonNavigateComponent,
    ButtonSendLinkComponent,
    DialogPdfComponent,
    TitleUnderlineComponent,
  ],
})
export class SharedModule {
  public static capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor() {
    // private bsLocaleService: BsLocaleService
    // Customização para mudar a placeholder do datapicker quando a data é inválida
    // this.bsLocaleService.use('pt-br');
    // ptBrLocale.invalidDate = 'Data inválida';
    // defineLocale('pt-br', ptBrLocale);
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
