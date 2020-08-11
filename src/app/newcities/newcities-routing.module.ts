import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewcitiesComponent } from './newcities.component';


const routes: Routes = [
  {
    path: '',
    component: NewcitiesComponent,
    data: {
      breadcrumb: 'New City'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewcitiesRoutingModule { }
