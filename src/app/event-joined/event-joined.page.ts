import { Component, OnInit } from '@angular/core';
import { EventCallsService } from '../calls/event/event-calls.service';
import { UserSelectionService } from '../savedData/user-selection.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-joined',
  templateUrl: './event-joined.page.html',
  styleUrls: ['./event-joined.page.scss'],
})
export class EventJoinedPage implements OnInit {
  constructor(
    private eventCalls: EventCallsService,
    private userSelectionService: UserSelectionService,
    private alertController: AlertController,
    private router: Router, 
  ) { }

  joinedEventArray: any[] = []

  ngOnInit() {
    this.getAllJoinedEvents()
  }

  getAllJoinedEvents(){
    this.eventCalls.getUsersJoinedEvents(this.userSelectionService.getID()).subscribe((eventsArray) => {
      console.log('Received events array:', eventsArray);
      this.joinedEventArray = eventsArray
    })
  }

  async leaveChatroom(eventId: string) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to leave the event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Leave',
          handler: () => {
            this.confirmLeaveEvent(eventId);
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  confirmLeaveEvent(eventId: string) {
    console.log('Leaving the chatroom...');
    this.eventCalls.leaveEvent(this.userSelectionService.getID(), eventId).subscribe(() => {
      // After leaving the chatroom, navigate back to tab1
      this.getAllJoinedEvents()
    });
  }
}
