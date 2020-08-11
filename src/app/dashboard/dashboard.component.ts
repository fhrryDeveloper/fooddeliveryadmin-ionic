import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';
import * as moment from 'moment';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  rest: any[] = [];
  users: any[] = [];
  drivers: any[] = [];
  orders: any[] = [];
  displayOrders: any[] = [];
  dummy = Array(10);
  constructor(
    private api: ApisService,
    private router: Router
  ) {
    this.getRest();
    this.getUsers();
    this.getAllOrders();

  }

  ngOnInit() {
  }

  getRest() {
    this.api.getVenues().then((data) => {
      console.log('rest data', data);
      this.rest = data;
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }

  getUsers() {
    this.users = [];
    this.drivers = [];
    this.api.getUsers().then((data) => {
      console.log('users data', data);
      data.forEach(element => {
        if (element.type === 'user') {
          this.users.push(element);
        } else if (element.type === 'delivery') {
          this.drivers.push(element);
        }
      });
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }

  getAllOrders() {
    this.api.getAllOrders().then((data) => {
      console.log('orders data', data);
      data.forEach(element => {
        element.time = new Date(element.time);
      });
      data.sort((a, b) => b.time - a.time);
      this.orders = data;
      this.orders.forEach((element, i) => {
        if (i <= 9) {
          element.order = JSON.parse(element.order);
          this.displayOrders.push(element);
        }
      });
      this.dummy = [];
    }, error => {
      console.log(error);
      this.dummy = [];
    }).catch(error => {
      console.log(error);
      this.dummy = [];
    });
  }

  getDates(date) {
    return moment(date).format('llll');
  }

  getClass(item) {
    if (item === 'created' || item === 'accepted' || item === 'picked') {
      return 'btn btn-primary btn-round';
    } else if (item === 'delivered') {
      return 'btn btn-success btn-round';
    } else if (item === 'rejected' || item === 'cancel') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }

  openOrder(item) {
    console.log(item);
    const navData: NavigationExtras = {
      queryParams: {
        id: item.id
      }
    };
    this.router.navigate(['admin-orderdetails'], navData);
  }

  getCurreny() {
    return this.api.getCurrecySymbol();
  }
}
