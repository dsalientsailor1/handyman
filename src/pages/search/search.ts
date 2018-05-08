import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ProfilesProvider } from '../../providers/services/profiles';
import { ProfilePage } from '../profile/profile';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';
import { Http } from '@angular/http';
import { CompprofilesPage } from '../compprofiles/compprofiles';
import { MapPage } from '../map/map';
import { Diagnostic } from '@ionic-native/diagnostic';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare const google;

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild('map') mapElement: ElementRef;
  // @ViewChild('map') mapElement: ElementRef;
  showcomp: boolean = false;
  showindv: boolean = false;
  result: boolean;
  list: any;
  autocomplete: { input: string; };
  pos: any;
  lng: number;
  lat: number;
  public globals:any = global.config;
  company_handymen: any;
  individual_handymen: any;
  public idfromcat: any;
  map: any;
  public profiles: any;
  public pet: any;
  public loc: any;
  public showMapStatus:boolean=false;
  constructor(  private diagnostic: Diagnostic,
                public loadingCtrl: LoadingController, 
                private geolocation: Geolocation, 
                private http: Http, 
                public profilesProv:ProfilesProvider, 
                public navCtrl: NavController, 
                public navParams: NavParams) {
                



let successCallback = (isAvailable) => {alert(';yes') };
let errorCallback = (e) => alert(e);
alert('ee');
this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);

// only android
this.diagnostic.isGpsLocationEnabled().then(successCallback, errorCallback);


    this.autocomplete = { input: '' };
    this.pet = "individual_result"
    // this.profiles = profilesProv.getAll();
    this.idfromcat  = this.navParams.get('idfrom');
    
                          //fetching individual
                         
                         console.log(global.config.baseUrl+'controllers/mobile/fetch_individual_services.php?&id='+this.idfromcat+'');
                         let loading = this.loadingCtrl.create({
                          content: ''
                        });
                        loading.present()
      this.http.get(global.config.baseUrl+'controllers/mobile/fetch_individual_services.php?&id='+this.idfromcat+'').map(res => res.json()).subscribe(data => {
      console.log(data);
          switch(data.status){
            case "success":
            this.showindv = true;
            this.individual_handymen = data.data;
            loading.dismiss();
            console.log(this.individual_handymen.first_name)
            break;
          }
      });
                         //fetching company
                         console.log(global.config.baseUrl+'controllers/mobile/fetch_company_services.php?&id='+this.idfromcat+'');
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_company_services.php?&id='+this.idfromcat+'').map(res => res.json()).subscribe(data => {
      console.log(data);
      switch(data.status){
        case "success":
        this.showcomp = true;
        this.company_handymen = data.data;
        break;
      }
  }); 
  }

  ionViewDidLoad() {
   this.startMap();
    console.log(this.idfromcat);
  }
  

  goToProfile(id ){
    this.navCtrl.push(ProfilePage, { 
      id:id});

  }

  goTo(company_id ){
    this.navCtrl.push(CompprofilesPage, { 
      id:company_id});

  }

  useLocator(){
    this.geolocation.getCurrentPosition().then((resp) => {
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
        this.lat = data.coords.latitude,
        this.lng = data.coords.longitude
        this.pos={latit: this.lat, lngit:this.lng
        };

      console.log(this.pos);
      if (this.lat === null || this.lng === null){


      }else{
      //filter individual
      console.log(global.config.baseUrl+'controllers/mobile/fetch_individual_services.php?id='+this.idfromcat+'&lat='+this.lat+'&lng='+this.lng+'');
        this.http.get(global.config.baseUrl+'controllers/mobile/fetch_individual_services.php?id='+this.idfromcat+'&lat='+this.lat+'&lng='+this.lng+'').map(res => res.json()).subscribe(data => {
        this.individual_handymen = data.data;
        console.log(data);
        console.log(this.individual_handymen);
        
    });
    //filter company
    console.log(global.config.baseUrl+'controllers/mobile/fetch_company_services.php?id='+this.idfromcat+'&lat='+this.lat+'&lng='+this.lng+'');
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_company_services.php?id='+this.idfromcat+'&lat='+this.lat+'&lng='+this.lng+'').map(res => res.json()).subscribe(data => {
      this.company_handymen = data.data;
      console.log(data);
      console.log(this.company_handymen);

  });
      
      }
  
    });
   
  }
  searchResult(event) {
    console.log(this.autocomplete.input.length);
    console.log(this.autocomplete.input);
    if(this.autocomplete.input.length > 1){
      // console.log(global.config.baseUrl+'controllers/mobile/locate_cities.php?q='+this.autocomplete.input+'&type=locate');
    this.http.get(global.config.baseUrl+'controllers/mobile/locate_cities.php?q='+this.autocomplete.input+'&type=locate').map(res => res.json()).subscribe(data => {
      
      this.list = data.status;
      console.log(data);
      // console.log(global.config.baseUrl+'controllers/mobile/fetch_cities.php?&q='+this.autocomplete.input+'&type=locate');
      // console.log(this.list);
      this.result = true;
  });
    }
  }
  selectSearchResult(id){
    this.result = false;
    console.log(global.config.baseUrl+'controllers/mobile/fetch_individual_city.php?city='+id+'&service='+this.idfromcat+'')
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_individual_city.php?city='+id+'&service='+this.idfromcat+'').map(res => res.json()).subscribe(data => {
      console.log(data);
      switch(data.status){
        case "success":
        this.showindv = true;
        this.individual_handymen = data.data;
        break;

        default:
        this.showindv =false;
      }
      
  });
  console.log(global.config.baseUrl+'controllers/mobile/fetch_company_city.php?city='+id+'&service='+this.idfromcat+'')
  this.http.get(global.config.baseUrl+'controllers/mobile/fetch_company_city.php?city='+id+'&service='+this.idfromcat+'').map(res => res.json()).subscribe(data => {
    console.log(data);
    switch(data.status){
      case "success":
      this.showcomp = true;
      this.company_handymen = data.data;
      break;

      default:
      this.showcomp =false;
    }
    
});
    

}


startMap() {
  let posMaceio = {  lat: 6.430102, lng: 3.422202}
  this.map = new google.maps.Map(this.mapElement.nativeElement, {
    zoom: 12,
    center: posMaceio,
    mapTypeId: 'roadmap'
  });
    
  }

showMap(){

}
  run(){
    this.navCtrl.push(MapPage);
  }


}