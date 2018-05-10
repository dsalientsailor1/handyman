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
  selector: 'page-compprofiles',
  templateUrl: 'compprofiles.html',
})
export class CompprofilesPage {
  pet: any;
  compid: any;
  profiles: any;
  public globals:any = global.config;
  following = false;
  show: boolean = false

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.compid  = this.navParams.get('id');
    console.log(this.navParams);
              //fetch
              console.log(this.compid);
     this.http.get(global.config.baseUrl+'controllers/mobile/fetch_company_details.php?id='+this.compid+'').map(res => res.json()).subscribe(data => {
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