import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-newcoupons',
  templateUrl: './newcoupons.component.html',
  styleUrls: ['./newcoupons.component.css']
})
export class NewcouponsComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  code: any = '';
  desc: any = '';
  min: any = '';
  type: any = '%';
  discout: any = '';
  upto: any = '';
  status: any = 'active';
  date: any;
  constructor(
    private api: ApisService,
    private chMod: ChangeDetectorRef,
    private toastyService: ToastyService,
    private spinner: NgxSpinnerService,
    private location: Location
  ) {

  }
  create() {
    console.log(this.discout);

    if (this.selectedItems.length > 0 && this.code && this.desc
      && this.min && this.type && this.discout && this.status && this.date) {
      if (this.min < 0) {
        this.error(this.api.translate('Wrong input for Min Cart Price'));
        return false;
      }
      if (this.discout < 0 || this.upto < 0) {
        this.error(this.api.translate('Wrong input for Discout Value and Discout Value Upto'));
        return false;
      }
      const date = moment(this.date);
      console.log(date.isValid());
      if (!date.isValid()) {
        this.error(this.api.translate('Wrong Expire date'));
        return false;
      }
      const today = moment();
      console.log('status', date.isAfter(today));
      if (!date.isAfter(today)) {
        this.error(this.api.translate('Date must be in future'));
        return false;
      }
      const id = Math.floor(100000000 + Math.random() * 900000000);
      console.log('id', id);
      const param = {
        available: this.selectedItems,
        code: this.code,
        desc: this.desc,
        min: this.min,
        type: this.type,
        discout: this.discout,
        upto: this.upto,
        status: this.status,
        expire: this.date,
        id: id.toString()
      };
      console.log('ok', param, id.toString());
      this.spinner.show();
      this.api.addCoupon(id.toString(), param).then(data => {
        this.spinner.hide();
        console.log(data);
        this.api.sendNotification('Availble on ' + this.selectedItems.length + ' Restaunrant and upto ' +
          this.upto + ' ' + this.type + ' Off till ' + moment(this.date).format('ll')
          , 'New Offer Added').subscribe((data) => {
            console.log(data);
            this.success(this.api.translate('Notications sent'));
          }, error => {
            console.log(error);
            this.error(this.api.translate('Something went wrong'));
          });
        this.success(this.api.translate('offer created'));
        this.location.back();
      }).catch(error => {
        this.spinner.hide();
        console.log(error);
        this.error(this.api.translate('Something went wrong'));
      });
    } else {
      console.log('no ok');
      this.error(this.api.translate('All Fields are required'));
      return false;
    }
  }
  ngOnInit() {
    this.api.getVenues().then((data) => {
      console.log('rest data', data);
      console.log(data.length);
      if (data && data.length) {
        this.dropdownList = data;
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'id',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true
        };
        this.chMod.detectChanges();
        console.log(this.dropdownList);
      }
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }
  onItemSelect(item: any) {
    console.log(item, this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items, this.selectedItems);
  }
  getList() {
    return this.dropdownList;
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

  getCurreny() {
    return this.api.getCurrecySymbol();
  }
}
