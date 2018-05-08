import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare const google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any;
  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }
  startMap() {
    let posMaceio = {  lat: 6.430102, lng: 3.422202}
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 12,
      center: posMaceio,
      mapTypeId: 'roadmap'
    });
      
    }

}
