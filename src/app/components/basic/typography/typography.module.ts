import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypographyRoutingModule } from './typography-routing.module';
import { TypographyComponent } from './typography.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TypographyRoutingModule,
    SharedModule
  ],
  declarations: [TypographyComponent]
})
export class TypographyModule { }
