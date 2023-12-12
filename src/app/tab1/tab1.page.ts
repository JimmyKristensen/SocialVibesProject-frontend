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
import { InvidCallService } from '../calls/invid-call.service';
import { MessageCallsService } from '../calls/message-calls.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonModal) modal: IonModal | any;

  //To simulate a get all users
  usersList: ProfileInterface[] = [];
  lastUserId: string = ""
  userData: Observable<any[]> = new Observable();


  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string | any;


  //To select which form functions should be activated form
  createChatData = new FormGroup({})

  invidChats: Observable<any[]> = new Observable();
  groupChats: Observable<any[]> = new Observable();

  chatroomsArray: any[] = [];

  selectedTab: string = 'Friends'; // Default to Friends tab
  chatroomsData: Observable<any[]> = new Observable(); //Need new observable to store the new data :(
  userDataToShow: Observable<any[]> = new Observable();
  userID: any;


  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private postChatService: PostChatService,
    private getAllUsersService: GetAllUsersService,
    private chatroomInvidCall: ChatroomCallsService, // Get all chatrooms for a user
    private invidCallService: InvidCallService,
    private messageCallService: MessageCallsService
    ) {}
  

    ngOnInit() {
      this.route.queryParams.subscribe((params) => {
        if (params['userID']) {
          const userID = params['userID'];
          console.log('Received userID in tab1:', userID);
          
          this.invidCallService.getInvidChats(userID).subscribe((chatroomsArray) => {
            console.log('Received chatrooms array:', chatroomsArray);
            this.chatroomsArray = chatroomsArray
          });
  


        }
      });


  
      this.getUsers("0");
    }
    
    private processChatroomsData(){
      console.log("It works i guess")
    }

  

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.getUsers(this.lastUserId)
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 5000);
  }

  getUsers(theLastIDInUsersList: string){
    if(!theLastIDInUsersList.match("0")){
      //console.log(theLastIDInUsersList)
      //console.log(this.usersList)
      theLastIDInUsersList = this.lastUserId
    }
    this.getAllUsersService.getAllUsersForPagination(theLastIDInUsersList).subscribe(res => {
      let profiles = res['profiles'];
      for (let key in profiles) {
        let name = profiles[key]['Name'];
        let userID = key;
        let userProfilForList: ProfileInterface
            userProfilForList = {
            id: userID,
            name: name,
            isChecked: false
          }
          let mockLoggedInUser = this.postChatService.getMockedLoggedInUser()
          if(!mockLoggedInUser.id.match(userProfilForList.id)){
            this.usersList.push(userProfilForList)
          }
          //console.log(userProfilForList)
        }
        //console.log(this.usersList)
        this.lastUserId = this.usersList[this.usersList.length-1].id
        //console.log(this.lastUserId)
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

  invidChat(chatroom: any) {
    const chatroomId = chatroom.ChatroomID;


      // Navigate to invidChat.page and pass the messages
      this.router.navigate(['/invidChat'], {
        queryParams: {
          chatroomId
        }
      });
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
