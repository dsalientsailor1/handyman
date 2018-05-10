import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';
import { Http } from '@angular/http';
/**
 * Generated class for the ServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
})
export class ServicePage {
  show: boolean;
  public name: any;
  public globals:any = global.config;
  public id: number;
  public services: any;

  constructor(public loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present()
    this.id  = this.navParams.get('id');
    this.name  = this.navParams.get('name');
    console.log(global.config.baseUrl+'controllers/mobile/fetch_services.php?id='+this.id+'');
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_services.php?id='+this.id+'').map(res => res.json()).subscribe(data => {
      this.show = true;
      this.services = data.data;
      loading.dismiss();
    console.log(data);
    console.log(this.services);
},error => {
  console.log("Ooops!");
  loading.dismiss();
  });
     }

  ionViewDidLoad() {
    console.log(this.navParams);
    console.log(this.name);
    console.log(this.id);
  }

  goToSearch(id){
    this.navCtrl.push(SearchPage, {idfrom:id})
  }

}
