import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { CitiesComponent } from './cities.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CitiesComponent],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    SharedModule
  ]
})
export class CitiesModule { }
