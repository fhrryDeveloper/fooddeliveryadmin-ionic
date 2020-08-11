import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponsRoutingModule } from './coupons-routing.module';
import { CouponsComponent } from './coupons.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CouponsComponent],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    SharedModule
  ]
})
export class CouponsModule { }
