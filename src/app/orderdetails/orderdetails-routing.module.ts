import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderdetailsComponent } from './orderdetails.component';


const routes: Routes = [
  {
    path: '',
    component: OrderdetailsComponent,
    data: {
      breadcrumb: 'Order Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderdetailsRoutingModule { }
