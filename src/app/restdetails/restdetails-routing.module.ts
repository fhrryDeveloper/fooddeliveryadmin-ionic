import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestdetailsComponent } from './restdetails.component';


const routes: Routes = [
  {
    path: '',
    component: RestdetailsComponent,
    data: {
      breadcrumb: 'Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestdetailsRoutingModule { }
