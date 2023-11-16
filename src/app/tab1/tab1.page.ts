import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvidCallService } from '../calls/invid-call.service';

@Component({
 selector: 'app-tab1',
 templateUrl: 'tab1.page.html',
 styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
 selectedTab: string = 'Friends'; // Default to Friends tab
 constructor(private router: Router, private invidCallService: InvidCallService) {}

 chats: {
     id: number,
     numberMembers: number,
     time: string,
     numberOfMessages: number,
     latestMessage: Date,
     Type: string,
   }[] = [];

 showContent(tab: string) {
   this.selectedTab = tab;
 }

 invidChat() {
   this.router.navigate(['invidChat']);
 }

 fetchData() {
   this.invidCallService.getData().subscribe(data => {
     
    //this.chats = data;
   });
 }
}
