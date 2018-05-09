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
public showmap:boolean = false;

  labels: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  labelIndex = 0;



  constructor(private diagnostic: Diagnostic,public loadingCtrl: LoadingController, private geolocation: Geolocation, private http: Http, public profilesProv:ProfilesProvider, public navCtrl: NavController, public navParams: NavParams) {

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
   var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;


  let myLocation = {  lat: 6.430102, lng: 3.422202}
 // let myLocation3 = {  lat: 7.430102, lng: 4.422202}
let myLocation2 = new google.maps.LatLng( myLocation);
  
  this.map = new google.maps.Map(this.mapElement.nativeElement, {
    zoom: 12,
    center: myLocation,
    mapTypeId: 'roadmap'
  });
 
directionsDisplay.setMap(this.map);




  this.individual_handymen.forEach(option => {
     var img = global.config.baseUrl+option.thumb;
    var handyIndividual = new google.maps.LatLng( 6.440103,3.492203);
    //google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);
   var g =  google.maps.geometry.spherical.computeDistanceBetween(handyIndividual, myLocation2) / 1000;
    var distance = g.toFixed(2);

      var contentString = '<div id="content"> <div id="siteNotice"></div>    <div><img class="img-full-width" src="'+img+'">  </div>   ';
          contentString +='<div>';
      
          contentString +='      <h3 align="center" id="firstHeading" class="firstHeading">'+option.first_name+' '+option.last_name+'</h3>   ';
          contentString +='         <div align="center" id="bodyContent"> <p>'+option.city+', ' +option.state_name+'</p>  ';
          contentString +='           <p align="center">'+option.phone1+'</p>   ';
            contentString +='           <p align="center"><strong>'+distance+'km from you</strong></p>   ';
          contentString +='   </div>    ';
          contentString +='  </div>';

              var infowindow = new google.maps.InfoWindow({
          content: contentString,
           maxWidth: 150
        });


             
              this.addMarker(handyIndividual, this.map,img,infowindow);


        //          var marker = new google.maps.Marker({
        //   position: uluru,
        //   map: map,
        //   title: 'Uluru (Ayers Rock)'
        // });
        // marker.addListener('click', function() {
        //   infowindow.open(map, marker);
        // });



//  this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyDdw262adSCagHNxfzDIi4UTKC1fI4cCE8').map(res => res.json()).subscribe(data => {
//     console.log('----'+data);
//     if(data.status =='OK'){

//                 this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.761452&key=AIzaSyDdw262adSCagHNxfzDIi4UTKC1fI4cCE8').map(res => res.json()).subscribe(data2 => {
//                 console.log('+++++++++'+data2);
//                 if(data2.status =='OK'){
//                      directionsService.route({
//                         origin:data.results[0].formatted_address,
//                         destination:data2.results[0].formatted_address,
//                         travelMode: 'DRIVING'
//                       }, function(response, status) {
//                         if (status === 'OK') {
//                           directionsDisplay.setDirections(response);
//                         } else {console.log(response,status)
//                           window.alert('Directions request failed due to ' + status);
//                         }
//                       });

//                 }else{

//                 }
    
// });
//     }else{

//     }
    
// });
    


        
              
              });


  }

showMap(){
 // console.log(this.individual_handymen);
  this.startMap();
}


 addMarker(location, map,img,infowindow) {


var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };


   var icon = {
    url: img, // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};


    let marker = new google.maps.Marker({
      position: location,
       zoom: 4,
      label: this.labels[this.labelIndex++ % this.labels.length],
      map: map,
        shape: shape,
	  // icon:'http://easyacesynergy.com/easyhr/marker.png'
    icon:icon
    });
	marker.addListener('click', function() {
           infowindow.open(map, marker);
         });

	//.///marker.setIcon('http://easyacesynergy.com/easyhr/marker.png');
	
  }





  run(){
    this.navCtrl.push(MapPage);
  }


}