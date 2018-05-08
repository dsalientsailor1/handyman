import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';
import { Http } from '@angular/http';

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
  following = false;
  
  public id: number;
  show: boolean = false

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.pet = "details"
    this.id  = this.navParams.get('id');
    console.log(this.navParams);
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_individual_details.php?id='+this.id+'').map(res => res.json()).subscribe(data => {
      this.profiles = data.status;
      console.log(data);
      console.log(this.profiles);
      this.show = true;
      console.log(this.show);
  });
    
  }

  ionViewDidLoad() {
    
  }

}
