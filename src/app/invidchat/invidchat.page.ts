import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-invidchat',
  templateUrl: './invidchat.page.html',
  styleUrls: ['./invidchat.page.scss'],
})
export class InvidchatPage implements OnInit {
  messages: any;
  chatroomId: any;

  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['messages']) {
        this.messages = JSON.parse(params['messages']);
        this.chatroomId = params['chatroomId'];
        console.log('Received messages in invidChat:', this.messages);
        console.log('Also recieved chatrooms id for the current chat: ', this.chatroomId)

        
      }
    });
  }
}