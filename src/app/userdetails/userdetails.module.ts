import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserdetailsRoutingModule } from './userdetails-routing.module';
import { UserdetailsComponent } from './userdetails.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [UserdetailsComponent],
  imports: [
    CommonModule,
    UserdetailsRoutingModule,
    NgxSpinnerModule,
    NgbTabsetModule,
    SharedModule
  ]
})
export class UserdetailsModule { }
