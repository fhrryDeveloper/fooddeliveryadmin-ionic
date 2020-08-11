import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleMapRoutingModule } from './google-map-routing.module';
import { GoogleMapComponent } from './google-map.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapRoutingModule,
    SharedModule
  ],
  declarations: [GoogleMapComponent]
})
export class GoogleMapModule { }
