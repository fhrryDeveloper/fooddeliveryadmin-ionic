import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewcouponsComponent } from './newcoupons.component';


const routes: Routes = [
  {
    path: '',
    component: NewcouponsComponent,
    data: {
      breadcrumb: 'Create new coupon'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewcouponsRoutingModule { }
