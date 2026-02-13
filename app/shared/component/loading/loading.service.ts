import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public message = new BehaviorSubject<string | null>(null);

  constructor() {}

  setMessage(message: string | null) {
    this.message.next(message);
  }

  getMessage() {
    return this.message.asObservable();
  }
}
