import { Component, ElementRef, Input } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  show: boolean = false
  public globals:any = global.config;
  editprofileloc: FormGroup;
  cities: any;
  states: any;
  countries: any;
  form:any;
  public formData:FormData = new FormData();
  // public formData:FormData = new FormData();
  current: any;
  saving: boolean = false;
  user: any;
  public profileedit : FormGroup;

  constructor(public loadCtrl: LoadingController, public toastCtrl: ToastController, private el: ElementRef, private formBuilder: FormBuilder, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.form = 'personal'
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user.id);
    console.log(this.user.first_name)
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_countries.php').map(res => res.json()).subscribe(data => {

      // this.showcategories = true;
      this.countries = data.status;
      console.log(data);
      console.log(this.countries);
  });
  console.log(global.config.baseUrl+'controllers/mobile/fetch_individual_details.php?&id='+this.user.id+'');
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_individual_details.php?&id='+this.user.id+'').map(res => res.json()).subscribe(data => {
      // global.config.baseUrl+'controllers/mobile/fetch_my_companies.php'
      // this.showcategories = true;
      this.current = data.status;
      console.log(data);
      console.log(this.current);
      this.profileedit.setValue({
        first_name: this.current.first_name,
        last_name: this.current.last_name,
        phone1: this.current.phone1,
        phone2: this.current.phone2,
        bio: this.current.bio,
        nationality: this.current.nationality,
        auth_key:'12345',
        mobile: 1,
        user_id: this.user.id
      });
      this.editprofileloc.setValue({
        country_of_residence: this.current.country_of_residence,
        state_of_residence: this.current.state_of_residence,
        city_of_residence: this.current.city_of_residence,
        address: this.current.address,
        auth_key:'12345',
        mobile: 1,
        user_id: this.user.id
      });
      this.show = true;
  });
    this.profileedit = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      phone1: [''],
      phone2: [''],
      bio: [''],
      nationality: [''],
      auth_key:['12345'],
      mobile: [1],
      user_id: [this.user.id]
      
    });

    this.editprofileloc = this.formBuilder.group({
      country_of_residence: [''],
      state_of_residence: [''],
      city_of_residence: [''],
      address: [''],
      auth_key:['12345'],
      mobile: [1],
      user_id: [this.user.id]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
    
    
  }

  upload(event){
    console.log(event);
    console.log(event.target.files[0])

    let fileList: FileList = event.target.files;
    console.log(fileList)
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this.formData.append('uploadFile', file, file.name);
        
    //        
    }
  }
  countryValue() {
    console.log(this.editprofileloc.value.country_of_residence);
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_states.php?&id='+this.editprofileloc.value.country_of_residence+'').map(res => res.json()).subscribe(data => {
    
    // this.showcategories = true;
    this.states = data.status;
    console.log(data);
    console.log(this.states);
});
  }
  stateValue() {
    console.log(this.editprofileloc.value.state_of_residence);
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_cities.php?&id='+this.editprofileloc.value.state_of_residence+'').map(res => res.json()).subscribe(data => {
    
    // this.showcategories = true;
    this.cities = data.status;
    console.log(data);
    console.log(this.cities);
});
  }

  logForm() {
    let headers = new Headers();
    //     /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
       // this.http.post('', formData, options)

//       //append the key name 'photo' with the first file in the element
        //  this.formData.append('photo', inputEl.files.item(0));
         this.formData.append('first_name',this.profileedit.value.first_name);
         this.formData.append('last_name', this.profileedit.value.last_name);
         this.formData.append('phone1', this.profileedit.value.phone1);
         this.formData.append('phone2', this.profileedit.value.phone2);
         this.formData.append('bio', this.profileedit.value.bio);
         this.formData.append('nationality', this.profileedit.value.nationality);
         this.formData.append('auth_key', this.profileedit.value.auth_key);
         this.formData.append('mobile', this.profileedit.value.mobile);
         this.formData.append('user_id', this.profileedit.value.user_id);
        //  let oneData = new FormData();
        //  oneData.append('mobile', this.company.value.mobile);
  var link = global.config.baseUrl+'controllers/mobile/edit_individual_details.php?&id='+this.user.id+'&type=personal';
    console.log(this.formData)
    console.log(global.config.baseUrl+'controllers/mobile/edit_individual_details.php?&id='+this.user.id+'&type=personal');
  this.http.post(link, this.formData)
    .subscribe(data => {
      console.log(data);
    }, error => {
    console.log("Oooops!");
    });
}

logFormTwo(){
  console.log(this.editprofileloc.value);
  var link = global.config.baseUrl+'controllers/mobile/edit_individual_details.php?&id='+this.user.id+'&type=contact';
  
  console.log(global.config.baseUrl+'controllers/mobile/edit_individual_details.php?id='+this.user.id+'&type=contact');
  this.http.post(link, this.editprofileloc.value).map(res => res.json()).subscribe(data => {

      console.log(data);
    }, error => {
    console.log("Oooops!");
    });
}

}
