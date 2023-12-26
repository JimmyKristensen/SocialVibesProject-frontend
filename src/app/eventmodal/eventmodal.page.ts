import { Component, Input, OnInit } from '@angular/core';
import { EventCallsService } from '../calls/event/event-calls.service';
import { UserSelectionService } from '../savedData/user-selection.service';

@Component({
  selector: 'app-eventmodal',
  templateUrl: './eventmodal.page.html',
  styleUrls: ['./eventmodal.page.scss'],
})
export class EventmodalPage implements OnInit {
  @Input() id: any;
  @Input() marker: any;
  Adress: any;
  Description: any;
  StartDate: any;
  StartTime: any;
  StopDate: any;
  StopTime: any;

  constructor(
    private eventCalls: EventCallsService,
    private userSelectionService: UserSelectionService
    ) { }

  ngOnInit() {
    console.log(this.id)
    this.getEventWithId()
  }

  getEventWithId(){
    this.eventCalls.getAllEvent(this.id).subscribe(res => {
      let event = res['Data']['Event']
      this.Adress = event['Adress'];
      this.Description = event['Description']
      this.StartDate = event['StartDate']
      this.StartTime = event['StartTime']
      this.StopDate = event['StopDate']
      this.StopTime = event['StopTime']
    })
  }

  joinEvent(){
    this.eventCalls.joinEvent(this.id, this.userSelectionService.getID()).subscribe(
      (data) => {
          console.log(data);
      },
      (error) => {
          console.error('An error occurred:', error);
      }
  );
  }


}

