import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  dummy = Array(10);
  users: any[] = [];
  list: any[] = [];
  constructor(
    private router: Router,
    private api: ApisService,
    private spinner: NgxSpinnerService,
  ) {
    console.log('list');
    this.getOffers();
  }

  getOffers() {
    this.api.getOffers().then(data => {
      console.log('list=====>', data);
      this.dummy = [];
      if (data && data.length) {
        this.list = data;
      }
    }).catch(error => {
      this.dummy = [];
      console.log(error);
    });
  }
  ngOnInit() {
  }
  createNew() {
    this.router.navigate(['admin-new-coupon']);
  }
  open(item) {
    console.log(item);
    const text = item.status === 'active' ? 'deactive' : 'active';
    Swal.fire({
      title: this.api.translate('Are you sure?'),
      text: this.api.translate('To ') + text + this.api.translate(' this coupon!'),
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: this.api.translate('Yes'),
      showCancelButton: true,
      cancelButtonText: this.api.translate('Cancle'),
      backdrop: false,
      background: 'white'
    }).then((data) => {
      if (data && data.value) {
        console.log('update it');
        item.status = text;
        this.spinner.show();
        this.api.updateOffers(item).then((data) => {
          this.spinner.hide();
          this.getOffers();
        }, error => {
          console.log(error);
          this.spinner.hide();
        }).catch(error => {
          this.spinner.hide();
          console.log(error);
        });
      }
    });
  }
  search(string) {

  }

  getDate(item) {
    return moment(item).format('lll');
  }
}
