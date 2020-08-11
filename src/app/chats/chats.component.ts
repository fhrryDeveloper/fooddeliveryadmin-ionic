import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { orderBy } from 'lodash';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  @ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;
  @ViewChildren('messages') messagesList: QueryList<any>;
  users: any[] = [];
  dummy: any[] = [];
  id: any;
  message: any;
  messages: any[] = [];
  selectedId: any;
  name: any;
  avtar: any;
  type: any;
  constructor(
    private api: ApisService,
    private adb: AngularFirestore
  ) {
    this.adb.collection('users').snapshotChanges().subscribe(data => {
      this.getUsers();
    });
  }
  ngAfterViewInit() {
    this.scrollToBottom();
    this.messagesList.changes.subscribe(this.scrollToBottom);
  }
  getMessages() {
    this.adb.collection('messages').doc(this.id).collection('chats').snapshotChanges().subscribe((data) => {
      console.log(data);
      this.api.getMessages(this.id).then(info => {
        console.log(info);
        info.sort((a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        this.messages = info;
        console.log('info', this.messages);
        this.scrollToBottom();
      }).catch(error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }
  getUsers() {
    this.users = [];
    this.api.getUsers().then((data) => {
      console.log('users data', data);
      let users = [];
      data.forEach(element => {
        if (element.type !== 'admin') {
          if (!element.count) {
            element.count = 0;
          }
          users.push(element);
        }
      });
      console.log(users);
      let sorted = orderBy(users, ['count'], 'desc');
      this.dummy = users;
      console.log('sorted-->', sorted);
      sorted = sorted.filter(x => x.uid !== this.selectedId);
      this.users = sorted;
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }
  ngOnInit() {
  }

  search(string) {
    this.resetChanges();
    console.log('string', string);
    this.users = this.filterItems(string);
  }
  send() {
    console.log('this.mess', this.message);

    if (this.message && this.id) {
      const text = this.message;
      this.message = '';
      console.log('send');
      const id = Math.floor(100000000 + Math.random() * 900000000);
      const data = {
        msg: text,
        from: 'admin',
        timestamp: new Date().toISOString(),
        id: 'admin',
        docId: id
      };
      this.adb.collection('messages').doc(this.id).collection('chats').doc(id.toString()).set(data).then((data) => {
        console.log('sent', data);
      }).catch(error => {
        console.log(error);
      });
    }
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  protected resetChanges = () => {
    this.users = this.dummy;
  }

  setFilteredItems() {
    console.log('clear');
    this.users = [];
    this.users = this.dummy;
  }

  filterItems(searchTerm) {
    return this.users.filter((item) => {
      if (item.type === 'venue') {
        return item.fname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      } else {
        return item.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }
    });

  }
  chatUser(item) {
    console.log(item);
    this.messages = [];
    this.type = item.type;
    if (item && item.type === 'user') {
      this.avtar = item.cover;
      this.name = item.fullname;
    } else if (item.type === 'delivery') {
      this.avtar = item.coverImage;
      this.name = item.fullname;
    } else if (item.type === 'venue') {
      this.name = item.fname + ' ' + item.lname;
    }
    this.selectedId = item.uid;
    this.users = this.dummy.filter(x => x.uid !== this.selectedId);
    this.id = 'admin' + item.uid;
    this.getMessages();
    if (item && item.count && item.count > 0) {
      const count = {
        count: 0,
      };
      this.api.updateProfile(item.uid, count).then(data => {
        console.log('updated', data);
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
