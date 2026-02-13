import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  activeRequests: number = 0;

  /**
   * URLs que não aparece o loanding
   */
  skippUrls = [environment.endpoints.proposta.consultaPgtoPix];

  constructor(public loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let displayLoadingScreen = true;

    for (const skippUrl of this.skippUrls) {
      if (request.url.includes(skippUrl)) {
        displayLoadingScreen = false;
        break;
      }
    }

    if (displayLoadingScreen) {
      this.loadingService.isLoading.next(true);
      return next.handle(request).pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
