import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  dummy = Array(10);
  banners: any[] = [];
  constructor(
    private router: Router,
    private api: ApisService,
    private spinner: NgxSpinnerService,
  ) {
    this.getBanners();
  }

  getBanners() {
    this.api.getBanners().then(data => {
      console.log(data);
      this.dummy = [];
      this.banners = data;
    }).catch(error => {
      this.dummy = [];
      console.log(error);
    });
  }
  ngOnInit() {
  }
  createNew() {
    this.router.navigate(['admin-newbanner']);
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
      text: this.api.translate('To ') + text + this.api.translate(' this banner!'),
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
        this.api.updateBanner(item).then((data) => {
          this.spinner.hide();
          this.getBanners();
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
      text: this.api.translate('To delete this banner!'),
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
        this.api.deleteBanner(item).then((data) => {
          this.spinner.hide();
          this.getBanners();
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
