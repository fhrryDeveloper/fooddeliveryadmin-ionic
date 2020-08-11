import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SharedModule
  ],
  declarations: [NotificationsComponent]
})
export class NotificationsModule { }
