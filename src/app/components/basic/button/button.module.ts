import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonRoutingModule } from './button-routing.module';
import { ButtonComponent } from './button.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonRoutingModule,
    SharedModule
  ],
  declarations: [ButtonComponent]
})
export class ButtonModule { }
