import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestdetailsRoutingModule } from './restdetails-routing.module';
import { RestdetailsComponent } from './restdetails.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [RestdetailsComponent],
  imports: [
    CommonModule,
    RestdetailsRoutingModule,
    GooglePlaceModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule,
    NgxSpinnerModule,
    NgbTabsetModule
  ]
})
export class RestdetailsModule { }
