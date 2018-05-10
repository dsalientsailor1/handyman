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
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  pet: any;
  user: any;
  profiles: any;
  public globals:any = global.config;
  bookmarked: boolean =false;
  
  public id: number;
  show: boolean = false

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.pet = "details"
    let userid = 7;

    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user !== null){ userid = this.user.id}
    console.log(this.user);
    this.id  = this.navParams.get('id');
    console.log(this.navParams);
    console.log(global.config.baseUrl+'controllers/mobile/fetch_individual_details.php?id='+this.id+'&user_id='+userid+'');
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_individual_details.php?id='+this.id+'&user_id='+userid+'').map(res => res.json()).subscribe(data => {
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
    this.http.get(global.config.baseUrl+'controllers/processors/fetch_services.php?id='+this.id+'&user_id='+this.user.id+'').map(res => res.json()).subscribe(data => {
      console.log(data);
      
      // this.services =data; 
   });
  }

}
