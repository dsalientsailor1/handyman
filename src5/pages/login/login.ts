import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import { RegisterPage } from '../register/register';
import { HomPage } from '../hom/hom';
import { TabsPage } from '../tabs/tabs';
import * as global from '../../app/global';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  initializeApp: any;
  public login: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  constructor(public toastCtrl: ToastController, private http: Http, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,) {
    this.login = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      auth_key:['12345'],
      mobile: [1]
      
    });
    this.email=this.login.controls['email'];
    this.password=this.login.controls['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
   
  }

  log(){
    console.log(this.login.value);
    var link = global.config.baseUrl+'controllers/processors/login.php';
  
    console.log(global.config.baseUrl+'controllers/processors/login.php');
    this.http.post(link, this.login.value).map(res => res.json()).subscribe(data => {
      
        console.log(data);
        window.localStorage.setItem('user', JSON.stringify(data))
        window.location.reload()
      }, error => {
      console.log("Ooops!");
      let toast = this.toastCtrl.create({
        message: "Login Details are Incorrect ",
        duration: 3000,
        position: 'top'
      });
      toast.present();

      });
 }

 goToRegister(){
   this.navCtrl.push(RegisterPage)
 }

}
