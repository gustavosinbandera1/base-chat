import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.service';
@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;
  constructor(private chat: ChatService) { }

  ngOnInit() {
  }

  send(): void {
    this.chat.sendMessage(this.message);
    this.message = '';
  }

  handleSubmit(event): void {
    if (event.keyCode === 13) {
      this.send();
    }
  }

}
