import { Component, ElementRef, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import * as global from '../../app/global';

@Component({
  selector: 'page-individual',
  templateUrl: 'individual.html',
})
export class IndividualPage {
  user: any;
  id: string;
  cities: any;
  countries: any;
  form: any;
  public service: any;
  category: any;
  services: any;
  states: any;
  categories: any;
  
  
  public individual: FormGroup;
  public individual_setup: FormGroup;
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


  this.http.get(global.config.baseUrl+'controllers/mobile/fetch_countries.php').map(res => res.json()).subscribe(data => {

    // this.showcategories = true;
    this.countries = data.data;
    console.log(data);
    console.log(this.countries);
});

this.individual = this.formBuilder.group({
  country: ['', Validators.required],
  state: ['', Validators.required],
  name: ['', Validators.required],
  phone: ['', Validators.required],
  address: ['', Validators.required],
  city: ['', Validators.required],
  website: ['', Validators.required],
  years: [''],
  auth_key:['12345'],
  mobile: [1],
  user_id: [this.user.id]
  });


this.individual_setup = this.formBuilder.group({
  service: ['', Validators.required],
  category: ['', Validators.required],
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
    console.log(this.individual_setup.value.category);
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_services.php?&id='+this.individual_setup.value.category+'').map(res => res.json()).subscribe(data => {
    
    // this.showcategories = true;
    this.services = data.data;
    console.log(data);
    console.log(this.services);
});
  }

  countryValue() {
    console.log(this.individual.value.company_country);
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_states.php?&id='+this.individual.value.company_country+'').map(res => res.json()).subscribe(data => {
    
    // this.showcategories = true;
    this.states = data.data;
    console.log(data);
    console.log(this.states);
});
  }

  stateValue() {
    console.log(this.individual.value.company_state);
    this.http.get(global.config.baseUrl+'controllers/mobile/fetch_cities.php?&id='+this.individual.value.company_state+'').map(res => res.json()).subscribe(data => {
    
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
         this.formData.append('country',this.individual.value.country);
         this.formData.append('state', this.individual.value.state);
         this.formData.append('name', this.individual.value.name);
         this.formData.append('phone', this.individual.value.phone);
         this.formData.append('address', this.individual.value.address);
         this.formData.append('city', this.individual.value.city);
         this.formData.append('website', this.individual.value.company_website);
         this.formData.append('years', this.individual.value.years);
         this.formData.append('auth_key', this.individual.value.auth_key);
         this.formData.append('mobile', this.individual.value.mobile);
         this.formData.append('user_id', this.individual.value.user_id);


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
    console.log(this.individual_setup.value);
    var link = global.config.baseUrl+'controllers/mobile/add_company_services.php';
    

    this.http.post(link, this.individual_setup.value)
      .subscribe(data => {
        console.log(data);
      }, error => {
      console.log("Oooops!");
      });
  }
  }