import { PreloadImageComponent } from './../components/preload-image/preload-image';
import { BackgroundImage } from './../components/background-image/background-image';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupmodalPage } from '../pages/signupmodal/signupmodal';
import { SignhandymodalPage } from '../pages/signhandymodal/signhandymodal';
import { SignupPage } from '../pages/signup/signup';
import { Geolocation } from '@ionic-native/geolocation';

import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from '../pages/tabs/tabs';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { NotificationsPage } from '../pages/notifications/notifications';
import { CategoriesProvider } from '../providers/services/categories';
import { ServiceProvider } from '../providers/services/service';
import { ProfilesProvider } from '../providers/services/profiles';
import { ServicePage } from '../pages/service/service';
import { CategoriesPage } from '../pages/categories/categories';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MessagesPage } from '../pages/messages/messages';
import { HomPage } from '../pages/hom/hom';
import { SearchPage } from '../pages/search/search';
import { ProfilePage } from '../pages/profile/profile';
import { IndividualPage } from '../pages/individual/individual';
import { CompanyPage } from '../pages/company/company';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { EditdashboardPage } from '../pages/editdashboard/editdashboard';
import { CompprofilesPage } from '../pages/compprofiles/compprofiles';
import { MapPage } from '../pages/map/map';
import { Diagnostic } from '@ionic-native/diagnostic';
// import { ModalsignupPage } from '../pages/modalsignup/modalsignup';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BackgroundImage,
    TabsPage,
    SignupmodalPage,
    SignhandymodalPage,
    PreloadImageComponent,
    CompanyPage,
    NotificationsPage,
    IndividualPage,
    MessagesPage,
    LoginPage,
    EditprofilePage,
    EditdashboardPage,
    RegisterPage,
    SignupPage,
    SearchPage,
    ServicePage,
    MapPage,
    CompprofilesPage,
    CategoriesPage,
    DashboardPage,
    HomPage,
    ProfilePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    CategoriesPage,
    PreloadImageComponent,
    EditdashboardPage,
    EditprofilePage,
    CompanyPage,
    SearchPage,
    DashboardPage,
    RegisterPage,
    LoginPage,
    MessagesPage,
    NotificationsPage,
    CompprofilesPage,
    IndividualPage,
    SignupPage,
    SignhandymodalPage,
    MapPage,
    SignupmodalPage,
    ServicePage,
    HomPage,
    ProfilePage,
    BackgroundImage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriesProvider,
    ServiceProvider,
    ProfilesProvider,
    Geolocation,
    Diagnostic,
    HTTP
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
