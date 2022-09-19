import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor() { }
  private notifyMessageSource = new BehaviorSubject<any>(null);
  currentNotifyMessage = this.notifyMessageSource.asObservable();
  async changeNotifyMessage(notify: any) {
    this.notifyMessageSource.next(notify);
  }
}
