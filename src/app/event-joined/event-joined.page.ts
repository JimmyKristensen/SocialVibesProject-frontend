import { Component, OnInit } from '@angular/core';
import { EventCallsService } from '../calls/event/event-calls.service';
import { UserSelectionService } from '../savedData/user-selection.service';

@Component({
  selector: 'app-event-joined',
  templateUrl: './event-joined.page.html',
  styleUrls: ['./event-joined.page.scss'],
})
export class EventJoinedPage implements OnInit {
  constructor(
    private eventCalls: EventCallsService,
    private userSelectionService: UserSelectionService
  ) { }

  joinedEventArray: any[] = []

  ngOnInit() {
    this.eventCalls.getUsersJoinedEvents(this.userSelectionService.getID()).subscribe((eventsArray) => {
      console.log('Received events array:', eventsArray);
      this.joinedEventArray = eventsArray
    })

  }
}
