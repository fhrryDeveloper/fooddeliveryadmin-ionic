import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicElementsRoutingModule } from './basic-elements-routing.module';
import { BasicElementsComponent } from './basic-elements.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BasicElementsRoutingModule,
    SharedModule
  ],
  declarations: [BasicElementsComponent]
})
export class BasicElementsModule { }
