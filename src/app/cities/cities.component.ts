import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities: any;
  dummy = Array(50);
  constructor(
    private router: Router,
    private api: ApisService,
    private spinner: NgxSpinnerService
  ) {
    this.getCity();
  }

  ngOnInit() {
  }
  getCity() {
    this.api.getCities().then(data => {
      console.log(data);
      this.cities = data;
      this.dummy = [];
    }).catch(error => {
      console.log(error);
      this.dummy = [];
    });
  }
  createNew() {
    this.router.navigate(['admin-newcities']);
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
    Swal.fire({
      title: this.api.translate('Are you sure?'),
      text: this.api.translate('To ') + text + this.api.translate(' this city!'),
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
        this.api.updateCity(item).then((data) => {
          this.spinner.hide();
          this.getCity();
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
  delete(item) {
    Swal.fire({
      title: this.api.translate('Are you sure?'),
      text: this.api.translate('To delete this city!'),
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
        this.spinner.show();
        this.api.deleteCity(item).then((data) => {
          this.spinner.hide();
          this.getCity();
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
}
