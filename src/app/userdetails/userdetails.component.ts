import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {
  myOrders: any[] = [];
  id: any;
  myaddress: any[] = [];
  reviews: any[] = [];
  name: any = '';
  email: any = '';
  photo: any = '';
  constructor(
    private api: ApisService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(data => {
      console.log(data);
      if (data && data.id) {
        this.id = data.id;
        this.getProfile();
        this.getMyOrders();
        this.getAddress();
      }
    });
  }

  ngOnInit() {

  }
  getProfile() {
    this.api.getMyProfile(this.id).then((data: any) => {
      console.log('userdata', data);
      if (data) {
        this.name = data.fullname;
        this.photo = data && data.cover ? data.cover : 'assets/icon.png';
        this.email = data.email;
        this.api.getMyReviews(data.uid).then((reviews) => {
          console.log(reviews);
          this.reviews = reviews;
        }, error => {
          console.log(error);
        }).catch(error => {
          console.log(error);
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }
  getAddress() {
    this.api.getMyAddress(this.id).then((data) => {
      console.log('my address', data);
      if (data) {
        this.myaddress = data;
      }
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }
  getMyOrders() {
    this.api.getMyOrders(this.id).then((data: any) => {
      console.log('my orders', data);
      if (data && data.length) {
        data.forEach(element => {
          element.time = new Date(element.time);
        });
        data.sort((a, b) => b.time - a.time);
        this.myOrders = data;
        this.myOrders.forEach(element => {
          element.order = JSON.parse(element.order);
        });
        console.log('my order==>', this.myOrders);
      }
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }

  getDate(date) {
    return moment(date).format('llll');
  }

  getCurrency() {
    return this.api.getCurrecySymbol();
  }
}
