import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selectedTab: string = 'Friends'; // Default to Friends tab

  constructor() {}

  showContent(tab: string) {
    this.selectedTab = tab;
  }
}