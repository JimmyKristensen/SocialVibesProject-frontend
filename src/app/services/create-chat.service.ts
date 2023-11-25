import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { PostChatService } from '../calls/post-chat.service';
import { ProfileInterface } from '../interfaces/profile-interface';
import { ParticipantsInterface } from '../interfaces/participants-interface';
//To simulate a user logged in
const mockLoggedInUser = {id:"-NjNSO0NQgtX8QnAAYWz", name: "Jimmy", isChecked: false}

 //Adds the mocked logged in user, this array is for profile that wants to be added to the newly created chat
let usersToAddToChatList: ProfileInterface[] = [mockLoggedInUser]

@Injectable({
  providedIn: 'root'
})
export class CreateChatService {

  constructor( private http: HttpClient, private postChatService: PostChatService) { }

  removeAllFromArray(){
    //Used to set all the users isChecked status to false
    usersToAddToChatList.forEach(function(user) {
      user.isChecked = false
    })
    //Removes eveyone else expted the logged in user
    usersToAddToChatList = [mockLoggedInUser]
  }

  addSelectedToArray(addProfileToChat : ProfileInterface){
    //Recive an obeject from the hmtl form with the selected profile
    // If seleted user's status, the status is used to check if the user has been selected and added to the array
    if(addProfileToChat.isChecked === false){
      // If false add the selected to usersToAddToChatList array
      usersToAddToChatList.push(addProfileToChat)
      // change the selected isChecked to true
      addProfileToChat.isChecked = true
    } else {
      // If isChecked is true, this will happend when a profile is deselected
      // Findes the index if the profile that needs to be removed
      let index = usersToAddToChatList.findIndex(profile => profile.id === addProfileToChat.id)
      // Removes the obeject from array
      if (index > -1) {
        usersToAddToChatList.splice(index, 1);
        }
      //Changes the status to false again
      addProfileToChat.isChecked = false
    }
    // Print out on consol the current array of wanted participants
    console.log(usersToAddToChatList)
  }
  
  makeListOfParticipants(){
    // the database want's an array of the participants id
    let participantsArray: string[] = []
    // Loops through the array and get's the id of selected users to add
    usersToAddToChatList.forEach(function(user){
      participantsArray.push(user.id)
    })
    // The logged in user will be selected as admin for the chat
    let admin: string = usersToAddToChatList[0].id
  
    // Discourse how to handle title
    let title: string = usersToAddToChatList[0].name
  
    // Creates a ParticipantsInterface with the above viables
    let participantsToSend: ParticipantsInterface
    participantsToSend = {
      Participants: participantsArray,
      Admin: admin,
      Title: title
    }
  
    
    this.postChatService
    .addChatRoom(participantsToSend)
    .subscribe((data) => {
      console.log(data);
    })
}

}
export { ProfileInterface };

