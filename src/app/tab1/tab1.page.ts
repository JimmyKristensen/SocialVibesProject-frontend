import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  selectedTab: string = 'Friends'; // Default to Friends tab
  invidChatsData: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

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
    console.log("Test data received: " + this.invidChatsData);
  });
}

}
