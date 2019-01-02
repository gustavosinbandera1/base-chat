import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: Observable<string>;

  constructor(
    private db: AngularFireDatabase// ,
    // private afAuth: AngularFireAuth
  ) {
    /* this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null ) {
        this.user = auth;
      }
    }); */
    console.log(this.getMessages());
   }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
   /*  const email = this.user.email; */
   const email = 'gustavosinbandera1@hotmail.com';

    this.chatMessages = this.getMessages();
    console.log(ChatMessage);
     /*this.chatMessages.push({
        message: msg,
        timestamp: timestamp,
      // userName: this.userName,
        username: 'GUstavogrisales',
        email: email
     });*/
     console.log('called sendMessage');
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 now.getUTCMonth() + '/' +
                 now.getUTCDate();

    const time = now.getUTCHours() + ':' +
                 now.getMinutes() + ':' +
                 now.getSeconds();
    return new Date((date + ' ' + time));
  }

  getMessages(): AngularFireList<ChatMessage> {
    /*query to create our message feed  binding */
    console.log('buscando mensajes');

    return this.db.list('messages');
    // return this.db.list('/messages').valueChanges();
  }
}
