import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportsRoutingModule } from './supports-routing.module';
import { SupportsComponent } from './supports.component';


@NgModule({
  declarations: [SupportsComponent],
  imports: [
    CommonModule,
    SupportsRoutingModule
  ]
})
export class SupportsModule { }
