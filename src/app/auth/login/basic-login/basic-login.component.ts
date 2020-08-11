import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {
  email: any = 'admin@gmail.com';
  password: any = '123456';
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
  }
  login() {
    if (!this.email || !this.password) {
      this.error(this.api.translate('All Fields are required'));
      return false;
    }
    this.spinner.show();
    this.api.login(this.email, this.password).then((data) => {
      console.log(data);
      this.api.getProfile(data.uid).then((info: any) => {
        this.spinner.hide();
        console.log(info);
        if (info && info.type === 'admin') {
          this.success(this.api.translate('Login success'));
          localStorage.setItem('uid', data.uid);
          this.router.navigate(['']);
        } else {
          this.error(this.api.translate('access denied'));
        }
      }, error => {
        this.spinner.hide();
        this.error(error);
      }).catch(error => {
        this.spinner.hide();
        console.log(error);
        this.error(error);
      });
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
