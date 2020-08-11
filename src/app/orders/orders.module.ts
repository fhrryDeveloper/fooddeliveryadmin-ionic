import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgxSkeletonLoaderModule,
    SharedModule
  ]
})
export class OrdersModule { }
