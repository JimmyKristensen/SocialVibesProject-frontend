import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { MessageCallsService } from '../calls/message/message-calls.service';
import { UserSelectionService } from '../savedData/user-selection.service'
import { ChatroomCallsService } from '../calls/chatroom/chatroom-calls.service';

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
  userID: any;
  title: any;

  

  constructor(
    private route: ActivatedRoute, 
    private socket: Socket,
    private messageCallService: MessageCallsService,
    private userSelectionService: UserSelectionService,
    private chatroomCallService: ChatroomCallsService,
    ) {}


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {

        this.chatroomId = params['chatroomId'];
        this.userID = this.userSelectionService.getID()
        console.log('Also recieved chatrooms id for the current chat: ', this.chatroomId)

        this.joinChatroom(this.chatroomId)


        //Getting the title, while ignoring the participant output
        this.chatroomCallService.getParticipants(this.chatroomId).subscribe({
          next: (result: any) => {
            this.title = result.title
          },
          error: (error: any) => {
            console.error('Error fetching participants:', error);
          },
        });

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
