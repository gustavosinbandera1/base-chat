import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../_models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages: ChatMessage[];
  chatMessage: ChatMessage;
  userName: Observable<string>; /*return from auth*/
  nameCollection: any = 'messages';

  constructor(
    private afDb: AngularFireDatabase// ,
    // private afAuth: AngularFireAuth
  ) {
    /* this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null ) {
        this.user = auth;
      }
    }); */
     this.getCollection(this.nameCollection).valueChanges().subscribe(messages => {
       this.chatMessages = messages;
     });

   }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
   /*  const email = this.user.email; */
   const email = 'gustavosinbandera1@hotmail.com';

    this.getCollection(this.nameCollection).push({
        message: msg,
        timestamp: timestamp,
        username: 'nicolas grisales',
        email: email
     });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 now.getUTCMonth() + 1 + '/' +
                 now.getUTCDate();

    const time = now.getUTCHours() + ':' +
                 now.getMinutes() + ':' +
                 now.getSeconds();
    return (date + ' ' + time);
  }

/*return a observable AngularFireList  */
  getCollection(nameCollection: string): AngularFireList<ChatMessage> {
    return this.afDb.list(nameCollection);
  }
}
