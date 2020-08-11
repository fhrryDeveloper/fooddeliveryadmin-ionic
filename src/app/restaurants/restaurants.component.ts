import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { Router, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  rest: any[] = [];
  dummyRest: any[] = [];
  dummy = Array(10);
  constructor(
    private api: ApisService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    this.getRest();
  }

  getRest() {
    this.api.getVenues().then((data) => {
      console.log('rest data', data);
      this.rest = data;
      this.dummyRest = data;
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
    this.rest = this.filterItems(string);
  }


  protected resetChanges = () => {
    this.rest = this.dummyRest;
  }

  setFilteredItems() {
    console.log('clear');
    this.rest = [];
    this.rest = this.dummyRest;
  }

  filterItems(searchTerm) {
    return this.rest.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  ngOnInit() {
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

  openRest(item) {
    const navData: NavigationExtras = {
      queryParams: {
        id: item.id,
        register: false
      }
    };
    this.router.navigate(['admin-rest-details'], navData);
  }

  changeStatus(item) {
    console.log(item);
    const text = item.status === 'open' ? 'close' : 'open';
    Swal.fire({
      title: this.api.translate('Are you sure?'),
      text: this.api.translate(`You can change it later`),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.api.translate('Yes, ') + text + this.api.translate(' it!')
    }).then((result) => {
      if (result.value) {
        const param = {
          uid: item.uid,
          isClose: true,
          status: text,
        };
        this.spinner.show();
        this.api.updateVenue(param).then((data) => {
          this.spinner.hide();
          this.getRest();
          Swal.fire(
            this.api.translate('Updated!'),
            this.api.translate('Restaurants updated'),
            'success'
          );
        }).catch(error => {
          console.log(error);
          this.spinner.hide();
        });
        const userStatus = text === 'open' ? 'active' : 'deactive';
        const statusChange = {
          status: userStatus
        };
        this.api.updateProfile(item.uid, statusChange).then(data => {
          console.log(data);
        }).catch(error => {
          console.log(error);
        });
      }
    });
  }

  createNew() {
    const navData: NavigationExtras = {
      queryParams: {
        register: true
      }
    };
    this.router.navigate(['admin-rest-details'], navData);
  }

  getCurrency() {
    return this.api.getCurrecySymbol();
  }
}
