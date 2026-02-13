import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    standalone: false
})
export class LoadingComponent implements OnInit{
  loadingSubscription: Subscription = new Subscription();

  message = this.loadingScreenService.getMessage();

  constructor(private loadingScreenService: LoadingService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

}
