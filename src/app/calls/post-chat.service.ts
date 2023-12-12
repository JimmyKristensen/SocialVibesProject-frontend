import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParticipantsInterface } from '../interfaces/participants-interface';
import { ProfileInterface } from '../interfaces/profile-interface';
import { UserSelectionService } from '../savedData/user-selection.service'


@Injectable({
  providedIn: 'root'
})
export class PostChatService {



  URLForApi: string = 'http://127.0.0.1:5000/chatroom/create-chat';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };
  mockLoggedInUser = {id: this.profileService.getID(), name: this.profileService.getName(), isChecked: false}

  usersToAddToChatList : ProfileInterface[] = [this.mockLoggedInUser]

  constructor(
    private http: HttpClient,
    private profileService: UserSelectionService
    ) {}
  
  addChatRoom(){
    let participants : ParticipantsInterface = this.makeListOfParticipants()
    console.log(this.http.post<ParticipantsInterface>(this.URLForApi, participants))
    return this.http.post<ParticipantsInterface>(this.URLForApi, participants, this.httpHeader)
  }

  removeAllFromArray(){
    //Used to set all the users isChecked status to false
    this.usersToAddToChatList.forEach(function(user) {
      user.isChecked = false
    })
    //Removes eveyone else expted the logged in user
    this.usersToAddToChatList = [this.mockLoggedInUser]
  }

  addSelectedToArray(addProfileToChat : ProfileInterface){
    // Recive an obeject from the hmtl form with the selected profile
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
  
  makeListOfParticipants(){
    // the database want's an array of the participants id
    let participantsArray: string[] = []
    // Loops through the array and get's the id of selected users to add
    this.usersToAddToChatList.forEach(function(user){
      participantsArray.push(user.id)
    })
    // The logged in user will be selected as admin for the chat
    let admin: string = this.usersToAddToChatList[0].id
    console.log(admin)
  
    // Discourse how to handle title
    let title: string = this.usersToAddToChatList[0].name
    console.log(title)
  
    // Creates a ParticipantsInterface with the above viables
    let participantsToSend: ParticipantsInterface
    participantsToSend = {
      Participants: participantsArray,
      Admin: admin,
      Title: title

    }

    return participantsToSend;

  }
  
  
  public getMockedLoggedInUser() : ProfileInterface {
    return this.mockLoggedInUser
  }
  

}
