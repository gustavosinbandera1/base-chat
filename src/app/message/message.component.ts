import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../_services/chat.service';
import { AuthService } from '../_services/auth.service';
import { ChatMessage } from '../_models/chat-message.model';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
@Input() chatMessage: ChatMessage;
userEmail: string;
userName: string;
messageContent: string;
timeStamp: string;
  constructor() { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timestamp.toString();
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.username;
  }

}
