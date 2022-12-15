import { Component, OnInit } from '@angular/core';
import { ChatUsers } from '../interface/config';
import { CallsService } from '../services/calls.service';
@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent implements OnInit {
  userData: ChatUsers[];
  ans: string;
  constructor(private callService: CallsService) { }

  ngOnInit(): void {
    this.callService.getLocal("dfgd").then((data) => {
      this.ans = JSON.stringify(data);

    });
  }

  test() { alert(this.ans); }
}