import { Component, OnInit } from '@angular/core';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import * as firebase from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from '../services/apis.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-newbanner',
  templateUrl: './newbanner.component.html',
  styleUrls: ['./newbanner.component.css']
})
export class NewbannerComponent implements OnInit {
  banner_to_upload: any = '';
  coverImage: any = '';
  rest: any[] = [];
  restId: any;
  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private spinner: NgxSpinnerService,
    private navCtrl: Location
  ) {
    this.getRest();
  }

  ngOnInit() {
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
  preview_banner(files) {

    console.log('fle', files);
    this.banner_to_upload = [];
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    this.banner_to_upload = files;
    if (this.banner_to_upload) {
      this.spinner.show();
      console.log('ok');
      const file1 = files[0];
      const storageRef = firebase.storage().ref('drivers' + '/' + file1.name);
      const task = storageRef.put(file1);
      task.on('state_changed',
        (snapshot: any) => {
        },
        (error) => {
          this.spinner.hide();
          this.error(this.api.translate('Something went wrong'));
          // this.api.alerts('Error', 'Something went wrong', 'error');
          console.error(error);
        },
        () => {
          storageRef.getDownloadURL().then((downloadURL) => {
            console.log('download ur', downloadURL);
            this.coverImage = downloadURL;
            this.spinner.hide();
          },
            (error) => {
              this.spinner.hide();
              this.error(this.api.translate('Something went wrong'));
              console.error('upload rejected', error);
            });
        }
      );

    } else {
      console.log('no');
    }
  }

  create() {
    let selected = this.rest.filter(x => x.id === this.restId);
    console.log(selected);
    if (this.restId === '' || !this.restId) {
      this.error(this.api.translate('Please select restaurants'));
      return false;
    }
    if (this.coverImage === '' || !this.coverImage) {
      this.error(this.api.translate('Please add image'));
      return false;
    }
    this.spinner.show();
    const id = Math.floor(100000000 + Math.random() * 900000000);
    console.log('id', id);
    const param = {
      banner: this.coverImage,
      status: 'active',
      id: id.toString(),
      restId: this.restId,
      name: selected[0].name
    };
    console.log('ok', param, id.toString());
    this.spinner.show();
    this.api.addBanner(id.toString(), param).then(data => {
      this.spinner.hide();
      console.log(data);
      this.api.sendNotification('Checkout New Offer Available on ' + selected[0].name, 'New Offer Added').subscribe((data) => {
        console.log(data);
        this.success(this.api.translate('Notications sent'));
      }, error => {
        console.log(error);
        this.error(this.api.translate('Something went wrong'));
      });
      this.api.alerts(this.api.translate('Success'), this.api.translate('Banner Added'), 'success');
      this.navCtrl.back();
    }).catch(error => {
      this.spinner.hide();
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
    });
  }
}
