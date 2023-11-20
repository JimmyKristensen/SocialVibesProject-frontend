import { Component, ViewChild, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

interface ParticipantsInterface {
  id: string;
  name: string;
  isChecked: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonModal) modal: IonModal | any;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string | any;
  //items : String[] = [];
  usersList: ParticipantsInterface[] = [
    {id:"NjNSO0NQgtX8QnAAYWz", name: "Jimmy", isChecked: false},
    {id:"NjNSQ17ewaStdPzImu6", name: "Nicolas", isChecked: false},
    {id:"NjNSRG1UK-t6UQ-tsb6", name: "Timmie", isChecked: false}
  ];

  participantsList: ParticipantsInterface[] = []

  

  ngOnInit() {
    for (let i = 1; i < 20; i++) {
      //this.items.push(`Item ${i}`);
    }

  }
  private generateItems() {
    /*
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
    */
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

  getSelectedBox(addProfileToChat : ParticipantsInterface){
    if(addProfileToChat.isChecked === false){
      this.participantsList.push(addProfileToChat)
      addProfileToChat.isChecked = true
    } else {
      let index = this.participantsList.findIndex(profile => profile.id === addProfileToChat.id)
      if (index > -1) {
        this.participantsList.splice(index, 1);
       }
      addProfileToChat.isChecked = false
    }
    console.log(this.participantsList)
  }

 
  
  createChatData = new FormGroup({})

  

  createChat(){
    /*
    this.http.post<posts>('https://jsonplaceholder.typicode.com/posts', chat)
    .subscribe((res) => {
      console.log(res);
    })
    */
    console.log(this.participantsList)
    
  }
}
