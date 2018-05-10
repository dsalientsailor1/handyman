import { Component, ElementRef, Input } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';


/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editdashboard',
  templateUrl: 'editdashboard.html',
})
export class EditdashboardPage {
  saving: boolean = false;
  user: any;
  public dashboardedit : FormGroup;

  constructor(public toastCtrl: ToastController, private el: ElementRef, private formBuilder: FormBuilder, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user.id);
    console.log(this.user.first_name)
    this.dashboardedit = this.formBuilder.group({
      company_name: [''],
      company_phone: [''],
      company_address: [''],
      company_website: [''],
      auth_key:['12345'],
      mobile: [1],
      user_id: [this.user.id]
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
    
    this.dashboardedit.setValue({
      company_name: 'Easyace Synergy',
      company_phone: '12334455',
      company_address: 'yourprevious@email.com',
      company_website: '.com',
      auth_key:'12345',
      mobile: 1,
      user_id: this.user.id
    });
  }

  logForm(){
    console.log(this.dashboardedit.value);
    var link = global.config.baseUrl+'controllers/processors/create-user.php';
    

    this.http.post(link, this.dashboardedit.value).map(res => res.json()).subscribe(data => {

        console.log(data);
        window.localStorage.setItem('user', JSON.stringify(data))
        this.navCtrl.push(TabsPage)
      }, error => {
      console.log("Oooops!");
      let toast = this.toastCtrl.create({
        message: "Not Saved ",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      });
  }

  close(){
    this.navCtrl.push(TabsPage)
  }
  confirms(){
    this.saving = true;
  }

}
