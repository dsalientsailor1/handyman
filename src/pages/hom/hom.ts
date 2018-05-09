import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { SignupPage } from '../../pages/signup/signup';
import { Geolocation } from '@ionic-native/geolocation';
import { MessagesPage } from '../../pages/messages/messages';
import { HomePage } from '../../pages/home/home';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CategoriesProvider } from '../../providers/services/categories';
import { ServiceProvider } from '../../providers/services/service';

// http services
import { Http } from '@angular/http';
import { ServicePage } from '../service/service';
import { SearchPage } from '../search/search';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';

@Component({
  selector: 'page-hom',
  templateUrl: 'hom.html'
})
export class HomPage {
  categories: any;
  show: boolean = true;
  public globals:any = global.config;
  autocomplete: { input: string; };
  public list: any;
  // public globals:any = global.config;
  result:boolean;
  logged: boolean = false;

  constructor(public loadingCtrl: LoadingController, private geolocation: Geolocation, public serviceProv:ServiceProvider, private http: Http, public navCtrl: NavController, public modal: ModalController, public popoverCtrl: PopoverController, private alert: AlertController) {
    console.log(global.config.baseUrl+'controllers/mobile/home.php');
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present()
    this.http.get(global.config.baseUrl+'controllers/mobile/home.php').map(res => res.json()).subscribe(data => {
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
    this.autocomplete = { input: '' };
    if(localStorage.getItem('user') == null){
      
    }
    else{
     this.logged = true;
  }
  }

  ionViewDidLoad() {
    // get services
  //   this.http.get(global.config.baseUrl+'controllers/processors/fetch_services.php').map(res => res.json()).subscribe(data => {
  //     console.log(data);
  //     this.showcategories = true;
  //     this.services =data; 
  //  });

 
  }

  openService(id){
    this.navCtrl.push(ServicePage, {id:id})
  }
  presentSignup(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(SignupPage);
    popover.present({
      ev: myEvent
    });
  }

  login() {
    let alert = this.alert.create({
      title: 'Login',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Login',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          // text: 'Login',
          // handler: data => {
          //   if (User.isValid(data.username, data.password)) {
          //     // logged in!
          //   } else {
          //     // invalid login
          //     return false;
          //   }
          // }
        }
      ]
    });
    alert.present();
  

  // openSign() {
  //   const myModal = this.modal.create('');
  //   myModal.present();
}
 
//footer

messages() {
  this.navCtrl.push(MessagesPage);
}
home() {
  this.navCtrl.push(HomePage);
}

dashboard() {
  this.navCtrl.push(DashboardPage);
}
//search
searchResult(event) {
  console.log(this.autocomplete.input.length);
  console.log(this.autocomplete.input);
  if(this.autocomplete.input.length > 2){
    console.log(global.config.baseUrl+'controllers/mobile/search.php?&q='+this.autocomplete.input+'');
  this.http.get(global.config.baseUrl+'controllers/mobile/search.php?&q='+this.autocomplete.input+'').map(res => res.json()).subscribe(data => {
    // global.config.baseUrl+'controllers/mobile/fetch_categories.php'
    this.list = data.status;
    console.log(data);
    // console.log(this.list);
    this.result = true;
}, error => {
  console.log("Ooops!");
  this.show = false;
  });
  }
   
  
}
clearSearch(event) {
  console.log('stuffs')
  this.result = false;
}

selectSearchResult(id){
  this.navCtrl.push(SearchPage, {idfrom:id});
}

useLocator(){
this.geolocation.getCurrentPosition().then((resp) => {
  console.log('My latitude : ', resp.coords.latitude);
  console.log('My longitude: ', resp.coords.longitude);
  alert(resp.coords.latitude);
  alert(resp.coords.longitude);
 }).catch((error) => {
   console.log('Error getting location', error);
 });
 let watch = this.geolocation.watchPosition();
watch.subscribe((data) => {
  alert(data.coords.latitude);
  alert(data.coords.longitude);
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude
});

}
reload(){
  // 
  window.location.reload()
}

}

