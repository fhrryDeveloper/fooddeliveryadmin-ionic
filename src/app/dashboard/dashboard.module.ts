import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
