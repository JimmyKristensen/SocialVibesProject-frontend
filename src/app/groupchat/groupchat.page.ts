import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { AlertController } from '@ionic/angular';
import { MessageCallsService } from '../calls/message/message-calls.service';
import { UserSelectionService } from '../savedData/user-selection.service';
import { ChatroomCallsService } from '../calls/chatroom/chatroom-calls.service';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.scss'],
})
export class GroupchatPage implements OnInit {
  messages: any;
  chatroomId: any;
  messageList: any;
  userMessage: any;
  userID: any;
  participants: any;

  

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private socket: Socket,
    private messageCallService: MessageCallsService,
    private userSelectionService: UserSelectionService,
    private alertController: AlertController,
    private chatroomCallService: ChatroomCallsService,
    ) {}


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {

        this.chatroomId = params['chatroomId'];
        this.userID = this.userSelectionService.getID()
        console.log('Also recieved chatrooms id for the current chat: ', this.chatroomId)
        console.log('User id is: '+this.userID)

        this.joinChatroom(this.chatroomId)
    });
  }

  sendMessage(userMessage: string) {
    if (userMessage.trim() === ''){
      console.log("Empty message")
    } else{
      const selectedUserId = this.userSelectionService.getSelectedUserId();
      console.log("Sent Message: ",userMessage + " From: ",selectedUserId)
    this.messageCallService.sendMessages(userMessage, this.chatroomId, selectedUserId)
    }
  }
  
  private joinChatroom(chatroomId: any){
    if(this.chatroomId){
      this.socket.emit('chatroom_join', {chatroom_id: chatroomId})
      this.socket.on('message_list', (messageList: { [s: string]: unknown; } | ArrayLike<unknown>) => {
        console.log("This is the socket chat: ",messageList);
        this.messageList = messageList



        });
        this.socket.on('new_message', (newMessage: any) => {
          console.log('New message received:', newMessage);
          console.log("This is the messageList:", this.messageList)
          this.messageList.push(newMessage); // Add the new message to the list
          newMessage = ""
        });
    }
  }
  onBackButtonClick(){
    this.socket.removeAllListeners()

  }

  async leaveChatroom() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to leave the chatroom?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // User clicked "Cancel", do nothing.
          }
        },
        {
          text: 'Leave',
          handler: () => {
            // User clicked "Leave", handle leaving the chatroom here.
            // You can call your leaveChatroom logic or navigate away.
            // For example:
            this.confirmLeaveChatroom();
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  confirmLeaveChatroom() {
    console.log('Leaving the chatroom...');
    this.chatroomCallService.leaveChatroom(this.userID, this.chatroomId).subscribe(() => {
      // After leaving the chatroom, navigate back to tab1
      this.router.navigate(['/tabs/tab1']);
    });
  }
  
  
}
