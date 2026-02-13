import { Injectable } from '@angular/core';
import { StorageEnum } from '../../enum';

@Injectable({ providedIn: 'root' })
export class StorageService {
  // constructor() {}

  saveData<T>(variable: StorageEnum, value: T): void {
    if (value) {
      if (variable === StorageEnum.UID) {
        sessionStorage.setItem(variable, value as string);
      } else {
        sessionStorage.setItem(variable, JSON.stringify(value));
      }
    }
  }

  getData<T>(variable: StorageEnum): T | null {
    const response = sessionStorage.getItem(variable);
    if (response) {
      if (variable === StorageEnum.UID) {
        return response as T;
      }
      return JSON.parse(response);
    }
    return null;
  }

  removeData(variable: StorageEnum): void {
    sessionStorage.removeItem(variable);
  }

  removeAll(): void {
    sessionStorage.clear();
  }
}
