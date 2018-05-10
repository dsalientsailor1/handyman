import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';
import { Http } from '@angular/http';
import { MessagePage } from './../message/message';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-compprofiles',
  templateUrl: 'compprofiles.html',
})
export class CompprofilesPage {
  user: any;
  pet: any;
  compid: any;
  profiles: any;
  public globals:any = global.config;
  bookmarked: boolean =false;
  show: boolean = false

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.pet = "details"
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.compid  = this.navParams.get('id');
    console.log(this.navParams);
              //fetch
              console.log(this.compid);
     this.http.get(global.config.baseUrl+'controllers/mobile/fetch_company_details.php?id='+this.compid+'&user_id='+this.user.id+'').map(res => res.json()).subscribe(data => {
      this.profiles = data.data;
      console.log(data);
      console.log(this.profiles);
      this.show = true;
      console.log(this.show);
  });
  }

  ionViewDidLoad() {
    
  }

  message(){
   this.navCtrl.push(MessagePage);
  }
  bookmark(){
    this.bookmarked = true;
    this.http.get(global.config.baseUrl+'controllers/processors/fetch_services.php').map(res => res.json()).subscribe(data => {
      console.log(data);
      
      // this.services =data; 
   });
  }

}