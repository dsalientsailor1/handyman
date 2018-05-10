import { Component, ElementRef, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';

/**
 * Generated class for the CompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {
  companies: any;
  user: any;
  
  cities: any;
  countries: any;
  id: string;
  form: any;
  
  public service: any;
  category: any;
  services: any;
  states: any;
  categories: any;
  public company: FormGroup;
  public company_setup: FormGroup;
  public formData:FormData = new FormData();

  constructor(private el: ElementRef, private formBuilder: FormBuilder, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.form = "personal";
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user.id);
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_categories.php').map(res => res.json()).subscribe(data => {
      // global.config.baseUrl+'controllers/mobile/fetch_categories.php'
      // this.showcategories = true;
      this.categories = data.data;
      console.log(data);
      console.log(this.categories);
  });
  console.log(global.config.baseUrl+'controllers/mobile/fetch_my_companies.php?&id='+this.user.id+'');
  this.http.get(global.config.baseUrl+'controllers/mobile/fetch_my_companies.php?&id='+this.user.id+'').map(res => res.json()).subscribe(data => {
    // global.config.baseUrl+'controllers/mobile/fetch_my_companies.php'
    // this.showcategories = true;
    this.companies = data.data;
    console.log(data);
    console.log(this.companies);
});


  this.http.get(global.config.baseUrl+'controllers/mobile/fetch_countries.php').map(res => res.json()).subscribe(data => {

    // this.showcategories = true;
    this.countries = data.data;
    console.log(data);
    console.log(this.countries);
});

this.company = this.formBuilder.group({
  company_country: ['', Validators.required],
  company_state: ['', Validators.required],
  company_name: ['', Validators.required],
  company_phone: ['', Validators.required],
  company_address: ['', Validators.required],
  company_city: ['', Validators.required],
  company_website: ['', Validators.required],
  company_years: ['', Validators.required],
  auth_key:['12345'],
  mobile: [1],
  user_id: [this.user.id]
  });


this.company_setup = this.formBuilder.group({
  service: ['', Validators.required],
  category: ['', Validators.required],
  company: ['', Validators.required],
  description: [''],
  auth_key:['12345'],
  mobile: [1],
  user_id: [this.user.id]
  });
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyPage');
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

  categoryValue() {
    console.log(this.company_setup.value.category);
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_services.php?&id='+this.company_setup.value.category+'').map(res => res.json()).subscribe(data => {
    
    // this.showcategories = true;
    this.services = data.data;
    console.log(data);
    console.log(this.services);
});
  }

  countryValue() {
    console.log(this.company.value.company_country);
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_states.php?&id='+this.company.value.company_country+'').map(res => res.json()).subscribe(data => {
    
    // this.showcategories = true;
    this.states = data.data;
    console.log(data);
    console.log(this.states);
});
  }

  stateValue() {
    console.log(this.company.value.company_state);
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_cities.php?&id='+this.company.value.company_state+'').map(res => res.json()).subscribe(data => {
    
    // this.showcategories = true;
    this.cities = data.data;
    console.log(data);
    console.log(this.cities);
});
  }


  logFormOne() {
    let headers = new Headers();
    //     /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
       // this.http.post('', formData, options)

//       //append the key name 'photo' with the first file in the element
        //  this.formData.append('photo', inputEl.files.item(0));
         this.formData.append('company_country',this.company.value.company_country);
         this.formData.append('company_state', this.company.value.company_state);
         this.formData.append('company_name', this.company.value.company_name);
         this.formData.append('company_phone', this.company.value.company_phone);
         this.formData.append('company_address', this.company.value.company_address);
         this.formData.append('company_city', this.company.value.company_city);
         this.formData.append('company_website', this.company.value.company_website);
         this.formData.append('company_years', this.company.value.company_years);
         this.formData.append('auth_key', this.company.value.auth_key);
         this.formData.append('mobile', this.company.value.mobile);
         this.formData.append('user_id', this.company.value.user_id);


        //  let oneData = new FormData();
        //  oneData.append('mobile', this.company.value.mobile);
  var link = global.config.baseUrl+'controllers/mobile/add_company_details.php';
  

  this.http.post(link, this.formData)
    .subscribe(data => {
      console.log(data);
    }, error => {
    console.log("Oooops!");
    });
}
 
 
 


 

  logFormTwo(){
    console.log(this.company_setup.value);
    var link = global.config.baseUrl+'controllers/mobile/add_company_services.php';
    

    this.http.post(link, this.company_setup.value)
      .subscribe(data => {
        console.log(data);
      }, error => {
      console.log("Oooops!");
      });
  }
  }



