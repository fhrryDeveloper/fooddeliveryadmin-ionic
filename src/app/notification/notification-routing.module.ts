import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification.component';


const routes: Routes = [
  {
    path: '',
    component: NotificationComponent,
    data: {
      breadcrumb: 'Notifications'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
