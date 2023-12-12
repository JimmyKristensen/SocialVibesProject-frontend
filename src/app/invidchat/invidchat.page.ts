import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { MessageCallsService } from '../calls/message-calls.service';
import { UserSelectionService } from '../savedData/user-selection.service'

@Component({
  selector: 'app-invidchat',
  templateUrl: './invidchat.page.html',
  styleUrls: ['./invidchat.page.scss'],
})
export class InvidchatPage implements OnInit {
  messages: any;
  chatroomId: any;
  messageList: any;
  userMessage: any;

  

  constructor(
    private route: ActivatedRoute, 
    private socket: Socket,
    private messageCallService: MessageCallsService,
    private userSelectionService: UserSelectionService,
    ) {}


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {

        this.chatroomId = params['chatroomId'];

        console.log('Also recieved chatrooms id for the current chat: ', this.chatroomId)

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

}
