import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { NotifyService } from '../services/notify.service';



@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  constructor(private notifyService: NotifyService) { }
  message: string | undefined;
  subscription: Subscription | undefined;
  counter: number = 5;
  status: boolean | undefined;

  ngOnInit(): void {
    this.notifyService.currentNotifyMessage.subscribe((message) => {
      if (message && !message?.success) {
        this.status = message.success;
        this.message = message.notifyMessage;
        this.subscription = interval(1000).subscribe(() => {
          this.counter--;
          if (this.counter === 0) {
            this.close.emit(false);
            if (this.subscription) this.subscription?.unsubscribe();
          }
        });
      }

      else if (message && message?.success) {
        this.status = message?.success;
        this.message = message.notifymessage;
        this.subscription = interval(1000).subscribe(() => {
          this.counter--;
          if (this.counter === 0) {
            this.close.emit(false);
            if (this.subscription) this.subscription?.unsubscribe();
          }
        });
      }

    });

  }

  ngOnDestroy() {
    if (this.subscription) this.subscription?.unsubscribe();
  }

  closeNotify() {
    this.close.emit(false);
  }


}
