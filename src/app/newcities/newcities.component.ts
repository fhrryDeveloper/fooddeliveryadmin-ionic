import { Component, OnInit } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApisService } from '../services/apis.service';
import { ToastyService, ToastData, ToastOptions } from 'ng2-toasty';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-newcities',
  templateUrl: './newcities.component.html',
  styleUrls: ['./newcities.component.css']
})
export class NewcitiesComponent implements OnInit {
  city: any;
  lat: any;
  lng: any;
  address: any;
  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private spinner: NgxSpinnerService,
    private navCtrl: Location
  ) { }

  ngOnInit() {
  }
  public handleAddressChange(address: Address) {
    console.log(address);
    this.city = address.name;
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
    console.log('=>', this.lng);
  }

  error(message) {
    const toastOptions: ToastOptions = {
      title: this.api.translate('Error'),
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    this.toastyService.error(toastOptions);
  }
  success(message) {
    const toastOptions: ToastOptions = {
      title: this.api.translate('Success'),
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    this.toastyService.success(toastOptions);
  }

  create() {

    if (!this.city || this.city === '' || !this.lat || !this.lng) {
      this.error(this.api.translate('Please select valid city name'));
      return false;
    }
    const id = Math.floor(100000000 + Math.random() * 900000000);
    const param = {
      name: this.city,
      status: 'active',
      id: id.toString(),
      lat: this.lat,
      lng: this.lng
    };
    console.log('ok', param, id.toString());
    this.spinner.show();
    this.api.addCity(id.toString(), param).then(data => {
      this.spinner.hide();
      console.log(data);
      this.api.alerts(this.api.translate('Success'), this.api.translate('City Added'), 'success');
      this.navCtrl.back();
    }).catch(error => {
      this.spinner.hide();
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
    });
  }

}
