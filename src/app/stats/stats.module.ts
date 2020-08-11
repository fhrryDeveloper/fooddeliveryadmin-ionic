import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    NgxPrintModule,
  ]
})
export class StatsModule { }
