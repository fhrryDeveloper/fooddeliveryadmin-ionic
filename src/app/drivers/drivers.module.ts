import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriversRoutingModule } from './drivers-routing.module';
import { DriversComponent } from './drivers.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [DriversComponent],
  imports: [
    CommonModule,
    DriversRoutingModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    SharedModule
  ]
})
export class DriversModule { }
