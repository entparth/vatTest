import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public vatForm;
  details:any;
  showCard: boolean = false;
  requestDate:any;
  date = new Date;
  
  constructor(public navCtrl: NavController,public formbuilder: FormBuilder, public api:ApiProvider, public loadingCtrl:LoadingController) {
    this.initializeForm();
  }


  //used to initialize the form values
  initializeForm(): void {
    this.vatForm = this.formbuilder.group({
      vatNumber: ["", Validators.compose([Validators.required])],
    });
  }

  //used to fetch the details from Api Provider/Service
  findVat(){
    console.log('vat numer',this.vatForm.value)
    this.api.getValues(this.vatForm.value.vatNumber).then((data:any) => {
    this.presentLoadingDefault();

      const splitDate = data.RequestDate.split('+');
      const requestDate = new Date(splitDate[0] + ':' + splitDate[1]);
      console.log('date', requestDate, data.RequestDate);
      data.RequestDate = requestDate;
      this.details = data;
      
        console.log(this.details);
        this.resetForm();
        this.showCard = true;
    })
  }

  //used to reset the values once clicked on the button
  resetForm(){
    this.vatForm.reset();
  }

  close(){
    this.showCard = false;

  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Getting your Data..'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 500);
  }
  
} 
