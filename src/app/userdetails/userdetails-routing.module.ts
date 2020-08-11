import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserdetailsComponent } from './userdetails.component';


const routes: Routes = [
  {
    path: '',
    component: UserdetailsComponent,
    data: {
      breadcrumb: 'Users Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserdetailsRoutingModule { }
