import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponsComponent } from './coupons.component';


const routes: Routes = [
  {
    path: '',
    component: CouponsComponent,
    data: {
      breadcrumb: 'Coupons'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule { }
