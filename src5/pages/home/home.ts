import { Component } from '@angular/core';
import { NavController, LoadingController, PopoverController, ModalController, AlertController } from 'ionic-angular';
import { SignupPage } from '../../pages/signup/signup';
import { MessagesPage } from '../../pages/messages/messages';
import { HomPage } from '../../pages/hom/hom';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';
import { Http } from '@angular/http';
import { ServicePage } from '../service/service';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  show: boolean;
  result: { string: any; };
  public globals:any = global.config;
  public categories:any;
  
  public services;
  // public globals:any = global.config;
  showcategories:boolean= false;

  constructor(public loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public modal: ModalController, public popoverCtrl: PopoverController, private alert: AlertController) {
    console.log(global.config.baseUrl+'controllers/mobile/fetch_all_categories.php');
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present()
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_all_categories.php').map(res => res.json()).subscribe(data => {
      // global.config.baseUrl+'controllers/mobile/fetch_categories.php'
      this.show = true;
      this.categories = data.data;
      loading.dismiss();
      console.log(data);
      console.log(this.categories);
  }, error => {
    console.log("Ooops!");
    loading.dismiss();
    this.show = false;
    });
  }
  

  ionViewDidLoad() {

  }

  openService(id, name){
    this.navCtrl.push(ServicePage, {id:id, name:name})
  }
  reload(){
    // 
    window.location.reload()
  }
}
