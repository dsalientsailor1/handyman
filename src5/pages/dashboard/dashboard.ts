import { EditdashboardPage } from './../editdashboard/editdashboard';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  goToSettings(){
    this.navCtrl.push(EditdashboardPage)
  }

  close(){
    this.navCtrl.push(TabsPage)
  }

}
