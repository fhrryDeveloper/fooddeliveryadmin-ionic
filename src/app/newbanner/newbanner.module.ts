import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewbannerRoutingModule } from './newbanner-routing.module';
import { NewbannerComponent } from './newbanner.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [NewbannerComponent],
  imports: [
    CommonModule,
    NewbannerRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class NewbannerModule { }
