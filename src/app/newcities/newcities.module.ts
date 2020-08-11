import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewcitiesRoutingModule } from './newcities-routing.module';
import { NewcitiesComponent } from './newcities.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
  declarations: [NewcitiesComponent],
  imports: [
    CommonModule,
    NewcitiesRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    GooglePlaceModule,
  ]
})
export class NewcitiesModule { }
