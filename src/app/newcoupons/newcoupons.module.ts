import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewcouponsRoutingModule } from './newcoupons-routing.module';
import { NewcouponsComponent } from './newcoupons.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [NewcouponsComponent],
  imports: [
    CommonModule,
    NewcouponsRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NewcouponsModule { }
