import {Component} from "@angular/core";
import {ViewController, AlertController, NavController, NavParams} from "ionic-angular";
import { RegisterPage } from "../register/register";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {
  constructor(public navCtrl: NavController, private alert: AlertController) {}

  register() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
