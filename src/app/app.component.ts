import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

class Message {
  constructor(
    username: string,
    email: string,
    message: string,
    timestamp: Date
  ) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'base-chat';
  datas: Message[] = [];
  data: Message;
  constructor(public db: AngularFireDatabase) {
    console.log('constructor app');

    // this.db.list('messages').valueChanges().subscribe(console.log);
     this.getMessages().valueChanges().subscribe(data => {
       console.log('nuevo dato en app');
       console.log(data);

     });
  }

  onSubmit() {
    this.db.list('/messages').push({
      email: 'afaber@hotmail.com',
      username: 'carlos',
      message: 'hola mundo',
      timestamp: new Date().getFullYear()
    });
  }

  getMessages(): AngularFireList<Message[]> {
    return this.db.list('messages');
  }
}
