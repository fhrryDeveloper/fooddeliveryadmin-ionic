import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  drivers: any[] = [];
  dummy = Array(10);
  dummyDrivers: any[] = [];
  constructor(
    private api: ApisService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    this.getUsers();
  }

  ngOnInit() {
  }

  getUsers() {
    this.drivers = [];
    this.dummyDrivers = [];
    this.api.getUsers().then((data) => {
      this.dummy = [];
      console.log('users data', data);
      data.forEach(element => {
        if (element.type === 'delivery') {
          this.drivers.push(element);
          this.dummyDrivers.push(element);
        }
      });
      console.log(this.drivers);
    }, error => {
      this.dummy = [];
      console.log(error);
    }).catch(error => {
      this.dummy = [];
      console.log(error);
    });
  }

  search(string) {
    this.resetChanges();
    console.log('string', string);
    this.drivers = this.filterItems(string);
  }


  protected resetChanges = () => {
    this.drivers = this.dummyDrivers;
  }

  setFilteredItems() {
    console.log('clear');
    this.drivers = [];
    this.drivers = this.dummyDrivers;
  }

  filterItems(searchTerm) {
    return this.drivers.filter((item) => {
      return item.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  createNew() {
    const navData: NavigationExtras = {
      queryParams: {
        register: true
      }
    };
    this.router.navigate(['admin-newdriver'], navData);
  }
  getClass(item) {
    if (item === 'active') {
      return 'btn btn-primary btn-round';
    } else if (item === 'deactive') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }

  changeStatus(item) {
    const text = item.status === 'active' ? 'deactive' : 'active';
    console.log(text);
    Swal.fire({
      title: this.api.translate('Are you sure?'),
      text: this.api.translate('To ') + text + this.api.translate(' this driver!'),
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
        console.log(item);
        this.spinner.show();
        this.api.updateProfile(item.uid, item).then((data) => {
          this.spinner.hide();
          this.getUsers();
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
  openDriver(item) {
    const navData: NavigationExtras = {
      queryParams: {
        id: item.uid,
        register: false
      }
    };
    this.router.navigate(['admin-newdriver'], navData);
  }
}
