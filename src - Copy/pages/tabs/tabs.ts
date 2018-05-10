import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { MessagesPage } from '../messages/messages';
import { DashboardPage } from '../dashboard/dashboard';
import { HomePage } from '../home/home';
import { HomPage } from '../hom/hom';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  cmsg: any;
  user: any;

  tab1Root = HomPage;
  tab2Root = HomePage;
  tab4Root = MessagesPage;

  constructor(private http: Http, public toastCtrl: ToastController) {

  //   this.user = JSON.parse(localStorage.getItem('user'));
  //   console.log(this.user.id);
  //   this.http.get(global.config.baseUrl+'controllers/mobile/fetch_notification_count.php?id='+this.user.id+'').map(res => res.json()).subscribe(data => {
  //     console.log(global.config.baseUrl+'controllers/mobile/fetch_notification_count.php?id='+this.user.id+'');
      
  //     console.log(data);
  //     this.cmsg = data.count;
      
  //     console.log(this.cmsg);
  //     // this.show = true;
  //     // console.log(this.show);
  // });

    let toast = this.toastCtrl.create({
      message: "Welcome To the IKnowAGuy Mobile Application",
      duration: 5000,
      position: 'top'
    });
    toast.present();

  }
}
