import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  dummy = Array(10);
  dummyUsers: any[] = [];
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.getUsers();
  }

  ngOnInit() {
  }
  getUsers() {
    this.users = [];
    this.dummyUsers = [];
    this.api.getUsers().then((data) => {
      this.dummy = [];
      console.log('users data', data);
      data.forEach(element => {
        if (element.type === 'user') {
          this.users.push(element);
          this.dummyUsers.push(element);
        }
      });
      console.log(this.users);
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
    this.users = this.filterItems(string);
  }


  protected resetChanges = () => {
    this.users = this.dummyUsers;
  }

  setFilteredItems() {
    console.log('clear');
    this.users = [];
    this.users = this.dummyUsers;
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
      text: this.api.translate('To ') + text + this.api.translate(' this user!'),
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
  filterItems(searchTerm) {
    return this.users.filter((item) => {
      return item.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  openUser(item) {
    const navData: NavigationExtras = {
      queryParams: {
        id: item.uid
      }
    };
    this.router.navigate(['admin-userdetails'], navData);
  }
}
