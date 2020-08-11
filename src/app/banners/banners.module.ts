import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannersRoutingModule } from './banners-routing.module';
import { BannersComponent } from './banners.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [BannersComponent],
  imports: [
    CommonModule,
    BannersRoutingModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    SharedModule
  ]
})
export class BannersModule { }
