// tab1.page.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatroomCallsService } from '../calls/chatroom-calls.service';
import { Observable } from 'rxjs';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FormGroup} from '@angular/forms';
import { ProfileInterface } from '../interfaces/profile-interface';
import { PostChatService } from '../calls/post-chat.service';
import { GetAllUsersService } from '../calls/get-all-users.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonModal) modal: IonModal | any;

  //To simulate a get all users
  usersList: ProfileInterface[] = [
  {id:"-NjgoJdCMe8wjbqpLme9", name: "Hannes", isChecked: false},
  {id:"-NjNSQ17ewaStdPzImu6", name: "Nicolas", isChecked: false},
  {id:"-NjNSRG1UK-t6UQ-tsb6", name: "Timmie", isChecked: false}
  ];
  userData: Observable<any[]> = new Observable();

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string | any;


  //To select which form functions should be activated form
  createChatData = new FormGroup({})

  selectedTab: string = 'Friends'; // Default to Friends tab
  chatroomsData: Observable<any[]> = new Observable(); //Need new observable to store the new data :(
  userDataToShow: Observable<any[]> = new Observable();
  invidChatsData: any;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private postChatService: PostChatService,
    private getAllUsersService: GetAllUsersService,
    private chatroomInvidCall: ChatroomCallsService // Get all chatrooms for a user
    ) {}
  

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const dataParam = params['invidChatsData'];
      this.invidChatsData = dataParam ? JSON.parse(dataParam) : null;
    });
    this.chatroomsData = this.chatroomInvidCall.getAllChatrooms(this.invidChatsData)
    this.getAllUser()
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

  getAllUser(){
    this.getAllUsersService.getAllUsers("0").subscribe(res => {
      
    })
  }

  //Modal
  cancel() {
    this.postChatService.removeAllFromArray()
    this.modal.dismiss(null, 'cancel');
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
    this.postChatService.addSelectedToArray(addProfileToChat)
  }

  createChat(){
    this.postChatService.addChatRoom().subscribe((data) => {
      console.log(data);
    })
  }

}
