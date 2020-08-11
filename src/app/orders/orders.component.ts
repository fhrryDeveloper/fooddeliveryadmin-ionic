import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import * as moment from 'moment';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  dummOrders: any[] = [];
  dummy = Array(10);
  constructor(
    private api: ApisService,
    private router: Router
  ) {
    this.getAllOrders();
  }

  ngOnInit() {
  }
  getAllOrders() {
    this.api.getAllOrders().then((data) => {
      console.log('orders data', data);
      data.forEach(element => {
        element.time = new Date(element.time);
        element.order = JSON.parse(element.order);
      });
      data.sort((a, b) => b.time - a.time);
      this.orders = data;
      this.dummOrders = data;
      this.dummy = [];
    }, error => {
      console.log(error);
      this.dummy = [];
    }).catch(error => {
      console.log(error);
      this.dummy = [];
    });
  }

  search(string) {
    this.resetChanges();
    console.log('string', string);
    this.orders = this.filterItems(string);
  }


  protected resetChanges = () => {
    this.orders = this.dummOrders;
  }

  setFilteredItems() {
    console.log('clear');
    this.orders = [];
    this.orders = this.dummOrders;
  }

  filterItems(searchTerm) {
    return this.orders.filter((item) => {
      return item.id.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

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
  getDates(date) {
    return moment(date).format('llll');
  }

  getCurrency() {
    return this.api.getCurrecySymbol();
  }
}
