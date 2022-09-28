import { Component } from '@angular/core';
import { notifyAnimation } from './animations/animations';
import { LoadingService } from './services/loading.service';
import { NotifyService } from './services/notify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [notifyAnimation.notifyTrigger],
})
export class AppComponent {
  title = 'chatnyou';
  constructor(private notifyService: NotifyService, public loadingService: LoadingService) { }
  ngOnInit(): void {
    this.notifyService.currentNotifyMessage.subscribe((message) => {
      if (message && !message?.success) {
        this.flagShowHide = !message.success;
      }
      else if (message && message?.success) {
        this.flagShowHide = message.success;
      }
    });
  }
  flagShowHide: boolean = false;
  closeNotification($event: boolean): void {
    this.flagShowHide = $event;
  }
}