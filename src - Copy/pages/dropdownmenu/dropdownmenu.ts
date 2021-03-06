import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';

/**
 * Generated class for the DropdownmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-dropdownmenu',
  templateUrl: 'dropdownmenu.html',
})
export class DropdownmenuPage {
  showLoading: boolean = true;
  show: boolean = true;
  cid: any;
  list: any;
  result: boolean;
  autocomplete: { input: string; };

  constructor( private http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DropdownmenuPage');
  }


  searchResult(event) {
    console.log(this.autocomplete.input.length);
    console.log(this.autocomplete.input);
    this.result = true;
    
    if(this.autocomplete.input.length > 2){
      console.log(global.config.baseUrl+'controllers/mobile/locate_cities.php?q='+this.autocomplete.input+'&type=locate');
    this.http.get(global.config.baseUrl+'controllers/mobile/locate_cities.php?q='+this.autocomplete.input+'&type=locate').map(res => res.json()).subscribe(data => {
      // global.config.baseUrl+'controllers/mobile/fetch_categories.php'
      this.list = data.data;
      console.log(data);
      // console.log(this.list);
     
      this.showLoading=false;
  }, error => {
    console.log("Ooops!");
    this.show = false;
    });
    }
  }

  selectSearchResult(id){
    this.cid = id;
  }

}
