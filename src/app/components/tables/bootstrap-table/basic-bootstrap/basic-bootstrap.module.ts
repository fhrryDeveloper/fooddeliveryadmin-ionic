import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicBootstrapRoutingModule } from './basic-bootstrap-routing.module';
import { BasicBootstrapComponent } from './basic-bootstrap.component';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BasicBootstrapRoutingModule,
    SharedModule
  ],
  declarations: [BasicBootstrapComponent]
})
export class BasicBootstrapModule { }
