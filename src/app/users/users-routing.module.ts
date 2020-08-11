import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      breadcrumb: 'Users'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
