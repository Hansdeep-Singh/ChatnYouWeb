import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private utilityService: UtilitiesService) { }

  ngOnInit(): void {
  }

  logout() {
    this.utilityService.Logout();
  }
}
