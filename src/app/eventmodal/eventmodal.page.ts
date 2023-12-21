import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventmodal',
  templateUrl: './eventmodal.page.html',
  styleUrls: ['./eventmodal.page.scss'],
})
export class EventmodalPage implements OnInit {
  @Input() id: any;
  @Input() Adress: any;
  @Input() Description: any;
  @Input() StartDate: any;
  @Input() StopDate: any;
  @Input() marker: any;

  constructor() { }

  ngOnInit() {
  }

 

}
