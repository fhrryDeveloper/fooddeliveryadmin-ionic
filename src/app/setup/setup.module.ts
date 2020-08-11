import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { SetupComponent } from './setup.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [SetupComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class SetupModule { }
