import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public registration : FormGroup;
  public first_name: AbstractControl;
  public last_name: AbstractControl;
  public email: AbstractControl;
  public phone_number: AbstractControl;
  public password: AbstractControl;

  constructor(public toastCtrl: ToastController, private http: Http, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,) {
    this.registration = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],
      password: ['', Validators.required],
      retype_password: [''],
      auth_key:['12345'],
      mobile: [1]
      
    });

    this.first_name=this.registration.controls['first_name'];
    this.last_name=this.registration.controls['last_name'];
    this.email=this.registration.controls['email'];
    this.phone_number=this.registration.controls['phone_number'];
    this.password=this.registration.controls['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
   
  }

  logForm(){


    
    console.log(this.registration.value);
    var link = global.config.baseUrl+'controllers/processors/create-user.php';
    console.log(global.config.baseUrl+'controllers/processors/create-user.php');

    this.http.post(link, this.registration.value).map(res => res.json()).subscribe(data => {

        console.log(data);
        window.localStorage.setItem('user', JSON.stringify(data))
        window.location.reload()
      }, error => {
      console.log("Oooops!");
      let toast = this.toastCtrl.create({
        message: "Ensure your Password is greater than 6 characters ",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      });
 }

    // console.log(this.registration.value)
  
}



