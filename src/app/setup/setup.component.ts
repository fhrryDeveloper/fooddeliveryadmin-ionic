import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  email: any = '';
  password: any = '';
  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) {
    const lng = localStorage.getItem('lng');
    if (!lng || lng === null) {
      localStorage.setItem('lng', 'en');
    }
    this.translate.use(localStorage.getItem('lng'));
  }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    console.log('hello');
    this.api.getUsers().then((data: any) => {
      console.log(data);
      if (data && data.length > 0) {
        this.router.navigate(['auth/login']);
      }
    });
  }
  login() {
    if (!this.email || !this.password) {
      this.error(this.api.translate('All Fields are required'));
      return false;
    }
    this.spinner.show();
    this.api.createAdminProfile(this.email, this.password).then((data) => {
      console.log(data);
      this.spinner.hide();
      Swal.fire({
        title: this.api.translate('Admin Profile Created'),
        text: this.api.translate('Please Login with your credentials'),
        icon: 'success'
      });
      this.router.navigate(['auth/login']);
    }, error => {
      this.spinner.hide();
      this.error(error);
    }).catch(error => {
      this.spinner.hide();
      console.log(error);
      this.error(error);
    });
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
  getClassName() {
    return localStorage.getItem('lng');
  }
  changeLng(lng) {
    localStorage.setItem('lng', lng);
    this.translate.use(lng);
  }

}
