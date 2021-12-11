import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor() { }
 message:String;
  ngOnInit(): void {
  }

}
