import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';
import { Http } from '@angular/http';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  countnot: any;
  countmsg: any;
  shownot: boolean = false;
  showmsg: boolean = false;
  notifications: any;
  
  messages: any;
  user: any;
  pet: any;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.pet = "messages"
//     this.user = JSON.parse(localStorage.getItem('user'));
//     console.log(this.user.id);
//     this.http.get(global.config.baseUrl+'controllers/mobile/fetch_my_messages.php?id='+this.user.id+'').map(res => res.json()).subscribe(data => {
//       console.log(global.config.baseUrl+'controllers/mobile/fetch_my_messages.php?id='+this.user.id+'');
      
//       console.log(data);
//       console.log(data);
//       switch(data.status){
//         case "success":
//         this.showmsg = true;
//         this.messages = data.data;
//         this.countmsg = data.count;
//         break;
//       }
//       console.log(this.messages);
//       // this.show = true;
//       // console.log(this.show);
//   });
//   console.log(global.config.baseUrl+'controllers/mobile/fetch_my_notification.php?id='+this.user.id+'');
//   this.http.get(global.config.baseUrl+'controllers/mobile/fetch_my_notification.php?id='+this.user.id+'').map(res => res.json()).subscribe(data => {

//     console.log(data);
//     switch(data.status){
//       case "success":
//       this.shownot = true;
//       this.notifications = data.data;
//       this.countnot = data.count;
//       break;
//     }
//     console.log(this.notifications);
//     // this.show = true;
//     // console.log(this.show);
// });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

}
