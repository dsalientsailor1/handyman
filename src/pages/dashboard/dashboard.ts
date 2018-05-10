import { EditprofilePage } from './../editprofile/editprofile';
import { RegisterPage } from './../register/register';
import { LoginPage } from './../login/login';
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
  logged: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    if(localStorage.getItem('user') == null){
      
    }
    else{
     this.logged = true;
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  goToSettings(){
    this.navCtrl.push(EditprofilePage)
  }

  close(){
    this.navCtrl.push(TabsPage)
  }

  goToReg(){
    this.navCtrl.push(RegisterPage)
  }
  goToLog(){
    this.navCtrl.push(LoginPage)
  }

}
