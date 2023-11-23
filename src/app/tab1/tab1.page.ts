import { Component, ViewChild, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';
import { FormGroup} from '@angular/forms';
import { CreateChatService } from '../calls/create-chat.service';

//Interface for Profiles
interface ProfileInterface {
  id: string;
  name: string;
  isChecked: boolean;
}
//Interface for Participants for the created chat
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

  //To simulate a user logged in
  mockLoggedInUser = {id:"-NjNSO0NQgtX8QnAAYWz", name: "Jimmy", isChecked: false}

  //To simulate a get all users
  usersList: ProfileInterface[] = [
    {id:"-NjgoJdCMe8wjbqpLme9", name: "Hannes", isChecked: false},
    {id:"-NjNSQ17ewaStdPzImu6", name: "Nicolas", isChecked: false},
    {id:"-NjNSRG1UK-t6UQ-tsb6", name: "Timmie", isChecked: false}
  ];

  //To select which form functions should be activated form
  createChatData = new FormGroup({})

  //Adds the mocked logged in user, this array is for profile that wants to be added to the newly created chat
  usersToAddToChatList: ProfileInterface[] = [this.mockLoggedInUser]



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
    //Used to set all the users isChecked status to false
    this.usersToAddToChatList.forEach(function(user) {
      user.isChecked = false
    })
    //Removes eveyone else expted the logged in user
    this.usersToAddToChatList = [this.mockLoggedInUser]
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
    //Recive an obeject from the hmtl form with the selected profile
    // If seleted user's status, the status is used to check if the user has been selected and added to the array
    if(addProfileToChat.isChecked === false){
      // If false add the selected to usersToAddToChatList array
      this.usersToAddToChatList.push(addProfileToChat)
      // change the selected isChecked to true
      addProfileToChat.isChecked = true
    } else {
      // If isChecked is true, this will happend when a profile is deselected
      // Findes the index if the profile that needs to be removed
      let index = this.usersToAddToChatList.findIndex(profile => profile.id === addProfileToChat.id)
      // Removes the obeject from array
      if (index > -1) {
        this.usersToAddToChatList.splice(index, 1);
        }
      //Changes the status to false again
      addProfileToChat.isChecked = false
    }
    // Print out on consol the current array of wanted participants
    console.log(this.usersToAddToChatList)
  }

  createChat(){
    // the database want's an array of the participants id
    let participantsArray: string[] = []
    // Loops through the array and get's the id of selected users to add
    this.usersToAddToChatList.forEach(function(user){
      participantsArray.push(user.id)
    })
    // The logged in user will be selected as admin for the chat
    let admin: string = this.usersToAddToChatList[0].id

    // Discourse how to handle title
    let title: string = this.usersToAddToChatList[0].name

    // Creates a ParticipantsInterface with the above viables
    let participantsToSend: ParticipantsInterface
    participantsToSend = {
      Participants: participantsArray,
      Admin: admin,
      Title: title
    }

    
    this.createChatService
    .addChatRoom(participantsToSend)
    .subscribe((data) => {
      console.log(data);
    })
    
    
  }
}
