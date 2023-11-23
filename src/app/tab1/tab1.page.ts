// tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatroomCallsService } from '../calls/chatroom-calls.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  selectedTab: string = 'Friends'; // Default to Friends tab
  chatroomsData: Observable<any[]> = new Observable(); //Need new observable to store the new data :(
  invidChatsData: any;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private chatroomInvidCall: ChatroomCallsService // Get all chatrooms for a user
    ) {}

  showContent(tab: string) {
    this.selectedTab = tab;
  }

  invidChat() {
    this.router.navigate(['invidChat']);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const dataParam = params['invidChatsData'];
      this.invidChatsData = dataParam ? JSON.parse(dataParam) : null;
    });
    this.chatroomsData = this.chatroomInvidCall.getAllChatrooms(this.invidChatsData)
  }
  
}
