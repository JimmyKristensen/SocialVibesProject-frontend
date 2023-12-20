import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventmodal',
  templateUrl: './eventmodal.page.html',
  styleUrls: ['./eventmodal.page.scss'],
})
export class EventmodalPage implements OnInit {
  @Input() marker: any;
  constructor() { }

  ngOnInit() {
  }

}
