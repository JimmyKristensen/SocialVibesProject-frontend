import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invidchat',
  templateUrl: './invidchat.page.html',
  styleUrls: ['./invidchat.page.scss'],
})
export class InvidchatPage implements OnInit {

  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const chatroomId = params.get('id');
      console.log('Chatroom ID:', chatroomId);
      // Now you can use chatroomId as needed
    });
  }
  

}
