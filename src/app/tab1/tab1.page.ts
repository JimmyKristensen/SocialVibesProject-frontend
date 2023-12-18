// tab1.page.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatroomCallsService } from '../calls/chatroom/chatroom-calls.service';
import { Observable } from 'rxjs';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FormGroup} from '@angular/forms';
import { ProfileInterface } from '../interfaces/profile-interface';
import { PostChatService } from '../calls/postChat/post-chat.service';
import { GetAllUsersService } from '../calls/getUsers/get-all-users.service';
import { InvidCallService } from '../calls/invidChat/invid-call.service';
import { MessageCallsService } from '../calls/message/message-calls.service';
import { UserSelectionService } from '../savedData/user-selection.service'
import { CommunitiesCallsService } from '../calls/communities-calls.service';

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

  individualChats: any;
  groupChats: any;
  communities: any;

  chatroomsArray: any[] = [];
  communitiesArray: any[] = []

  selectedTab: string = 'Friends'; // Default to Friends tab
  chatroomsData: Observable<any[]> = new Observable(); //Need new observable to store the new data :(
  userDataToShow: Observable<any[]> = new Observable();
  communitiesData: Observable<any[]> = new Observable();
  userID: any;


  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private postChatService: PostChatService,
    private getAllUsersService: GetAllUsersService,
    private chatroomInvidCall: ChatroomCallsService, // Get all chatrooms for a user
    private invidCallService: InvidCallService,
    private messageCallService: MessageCallsService,
    private communitiesCallService: CommunitiesCallsService,
    private userSelectionService: UserSelectionService,
    ) {}
  

ngOnInit() {
  this.route.queryParams.subscribe((params) => {
    if (params['userID']) {
      const userID = params['userID'];
      console.log('Received userID in tab1:', userID);

      this.invidCallService.getInvidChats(userID).subscribe((chatroomsArray) => {
        console.log('Received chatrooms array:', chatroomsArray);
        this.chatroomsArray = chatroomsArray
        
        // Filter the chatrooms based on their type
        this.individualChats = chatroomsArray.filter(chat => chat.Type === 'Individual Chat');
        this.groupChats = chatroomsArray.filter(chat => chat.Type === 'Group Chat');
        this.communities = chatroomsArray.filter(chat => chat.Type === 'Community');
        
        console.log('Individual Chats:', this.individualChats);
        console.log('Group Chats:', this.groupChats);
        console.log('Communities:', this.communities);

        // Now you have separate arrays for Individual Chats and Group Chats
        // You can assign these arrays to the corresponding variables in your component
      });
      
      this.communitiesCallService.getAllCommunities(userID).subscribe((communitiesArray) => {
        console.log('Received communities array:', communitiesArray);
        this.communitiesArray = communitiesArray
        
      })
    }
  });

  this.getUsers("0");
}


  

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.getUsers(this.lastUserId)
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 5000);
  }

  getUsers(theLastIDInUsersList: string){
    if(!theLastIDInUsersList.match("0")){
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
          let loggedInUser = this.userSelectionService.getID()
          if(!loggedInUser.match(userProfilForList.id)){
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

  communityChat(chatroom: any) {
    const chatroomId = chatroom.ChatroomID;


      // Navigate to invidChat.page and pass the messages
      this.router.navigate(['/communitychat'], {
        queryParams: {
          chatroomId
        }
      });
  }
  
  clickToJoinCommunity(communityId: string){
    this.communitiesCallService.joinCommunity(communityId, this.userSelectionService.getID()).subscribe((data) => {
      console.log(data);
    })
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
