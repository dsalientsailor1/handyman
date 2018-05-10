
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, App, Keyboard } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase'; 

import { HomePage } from '../pages/home/home';
import { HomPage } from '../pages/hom/hom';
import { SignupPage } from '../pages/signup/signup';
import { NotificationsPage } from '../pages/notifications/notifications';
import { TabsPage } from '../pages/tabs/tabs';
import { CompanyPage } from '../pages/company/company';
import { IndividualPage } from '../pages/individual/individual';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { LoginPage } from '../pages/login/login';



@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  
  user: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;
  pages: Array<{title: string, icon: string, component: any}>;
  pushPages: Array<{title: string, icon: string, component: any}>;
  logPage: Array<{title: string, icon: string}>;
  handyman: boolean =false;

 

  // appMenuItems: Array<MenuItem>;
  status: any;
  constructor(
    public platform: Platform,
    public app: App,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard
  ) {
    this.initializeApp();
    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(this.user.id);
    // this.logout();
   

    // this.appMenuItems = [
    //   {title: 'Home', component: HomePage, icon: 'home'},
     
    // ];
    
    if(localStorage.getItem('user') == null){
      
    }
    else{
      this.status='true';
    this.pages = [
      { title: 'Edit Profile', icon: 'person', component: EditprofilePage },
      { title: 'Settings', icon: 'cog', component: NotificationsPage },
    ];

    this.pushPages =[
      { title: 'Dashboard', icon: 'desktop', component: DashboardPage  },
     ]
     this.logPage =[
      { title: 'Logout', icon: 'exit',  },
     ]
  }

  

  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      // this.keyboard.disableScroll(true);
    });


   
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  company(){
    this.nav.push(CompanyPage);
  }
  individual(){
    this.nav.push(IndividualPage);
  }
  log(){
    this.nav.push(LoginPage);
  }

  logout() {
    window.localStorage.clear();
    window.location.reload()
  }

}
