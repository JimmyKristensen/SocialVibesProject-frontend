import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { MessageCallsService } from '../calls/message-calls.service';

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
    private messageCallService: MessageCallsService
    ) {}


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['messages']) {
        this.messages = JSON.parse(params['messages']);
        this.chatroomId = params['chatroomId'];
        console.log('Received messages in invidChat:', this.messages);
        console.log('Also recieved chatrooms id for the current chat: ', this.chatroomId)

        this.joinChatroom(this.chatroomId)
      }
    });
  }

  sendMessage(message: string) {
    if (message.trim() === ''){
      console.log("Empty message")
    } else{
    this.messageCallService.sendMessages(message, this.chatroomId)
    }
  }
  
  private joinChatroom(chatroomId: any){
    if(this.chatroomId){
      this.socket.emit('chatroom_join', {chatroom_id: chatroomId})
      console.log("Succ Yubiiiiii")

      this.socket.on('message_list', (messageList: { [s: string]: unknown; } | ArrayLike<unknown>) => {
        const chat = document.getElementById('chat');
        console.log("This is the socket chat: ",messageList);
        this.messageList = messageList
        // Clear existing messages

        });
        this.socket.on('new_message', (newMessage: any) => {
          console.log('New message received:', newMessage);
          this.messageList.push(newMessage); // Add the new message to the list
        });
    }
  }

}
