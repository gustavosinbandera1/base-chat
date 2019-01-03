import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../_services/chat.service';

import {ChatMessage} from '../_models/chat-message.model';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed: ChatMessage[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getCollection('messages')
      .valueChanges()
      .subscribe(messages => {
        this.feed = messages;
      });
  }

}
