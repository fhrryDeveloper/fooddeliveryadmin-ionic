import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    SharedModule
  ]
})
export class UsersModule { }
