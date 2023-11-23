import { Component, ViewChild, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup} from '@angular/forms';
import { CreateChatService } from '../calls/create-chat.service';

interface ProfileInterface {
  id: string;
  name: string;
  isChecked: boolean;
}
interface ParticipantsInterface {
  Participants: string[];
  Admin: string;
  Title: string;
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

  usersList: ProfileInterface[] = [
    {id:"-NjNSO0NQgtX8QnAAYWz", name: "Jimmy", isChecked: false},
    {id:"-NjNSQ17ewaStdPzImu6", name: "Nicolas", isChecked: false},
    {id:"-NjNSRG1UK-t6UQ-tsb6", name: "Timmie", isChecked: false}
  ];

  createChatData = new FormGroup({})
  usersToAddToChatList: ProfileInterface[] = []



  selectedTab: string = 'Friends'; // Default to Friends tab
  constructor(private router: Router, private http: HttpClient, private createChatService: CreateChatService) {}
  

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
    this.usersToAddToChatList.forEach(function(user) {
      user.isChecked = false
    })
    this.usersToAddToChatList = []
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


  showContent(tab: string) {
    this.selectedTab = tab;
  }

  invidChat() {
    this.router.navigate(['invidChat']);
  }

  getSelectedBox(addProfileToChat : ProfileInterface){
    if(addProfileToChat.isChecked === false){
      this.usersToAddToChatList.push(addProfileToChat)
      addProfileToChat.isChecked = true
    } else {
      let index = this.usersToAddToChatList.findIndex(profile => profile.id === addProfileToChat.id)
      if (index > -1) {
        this.usersToAddToChatList.splice(index, 1);
       }
      addProfileToChat.isChecked = false
    }
    console.log(this.usersToAddToChatList)
  }

  createChat(){
    let participantsArray: string[] = []
    this.usersToAddToChatList.forEach(function(user){
      participantsArray.push(user.id)
    })
    let admin: string = this.usersToAddToChatList[0].id
    let title: string = this.usersToAddToChatList[0].name
    let participantsToSend: ParticipantsInterface
    participantsToSend = {
      Participants: participantsArray,
      Admin: admin,
      Title: title
    }

    /*
    this.createChatService
    .addChatRoom(participantsToSend)
    .subscribe((data) => {
      console.log(data);
    })
    */
   
    
    this.http.post('http://127.0.0.1:5000/chatroom/create-chat', participantsToSend)
    .subscribe((res) => {
      console.log(res)
    })


    
  }
}
