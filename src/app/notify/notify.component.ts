import { Component, Input, OnInit } from '@angular/core';
import { generalService } from '../services/generalService';


@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  constructor(private service:generalService) { }
  messageBoxClass:string;
 
  ngOnInit(): void {
    this.messageBoxClass = 'fas fa-check-circle fa-5x';
  }

  get message()
  {
    return this.service.messageToNotification;
  }
}
