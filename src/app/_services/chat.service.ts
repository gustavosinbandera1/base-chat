import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../_models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: firebase.User;
  chatMessages: ChatMessage[];
  chatMessage: ChatMessage;
  userName: Observable<string>; /*return from auth*/
  nameCollection: any = 'messages';
  //userId: string;

  constructor(
    private afDb: AngularFireDatabase ,
     private afAuth: AngularFireAuth
  ) {
     this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null ) {
        this.user = auth;
        //this.userId = this.user.uid;

        this.getUser().valueChanges().subscribe(userProfile => {
          console.log('datos del ususario');
          console.log(userProfile);
        });

      }
    });


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
        username: this.user.email,
        email: this.user.email
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

  getUser() {
    //const userId = this.user.uid;
    const path = `/users/${this.user.uid}`;
    return this.afDb.object(path);


  }

  getUsers() {
    const path = '/users';
    return this.afDb.list(path);
  }
}
