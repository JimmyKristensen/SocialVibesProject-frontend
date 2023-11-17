import { Component, ViewChild, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonModal) modal: IonModal | any;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string | any;
  items : String[] = [];

  ngOnInit() {
    for (let i = 1; i < 20; i++) {
      this.items.push(`Item ${i}`);
    }
  }
  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  //Modal
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  //Modal end

  selectedTab: string = 'Friends'; // Default to Friends tab
  constructor(private router: Router, private http: HttpClient) {}

  showContent(tab: string) {
    this.selectedTab = tab;
  }

  invidChat() {
    this.router.navigate(['invidChat']);
  }

  createChat(){
    this.http.post('https://jsonplaceholder.typicode.com/posts', {
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      })
    }).subscribe((res) => {
      console.log(res);
    })
  }
}
