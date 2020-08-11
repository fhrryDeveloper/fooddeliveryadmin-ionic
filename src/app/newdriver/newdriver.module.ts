import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewdriverRoutingModule } from './newdriver-routing.module';
import { NewdriverComponent } from './newdriver.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [NewdriverComponent],
  imports: [
    CommonModule,
    NewdriverRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class NewdriverModule { }
