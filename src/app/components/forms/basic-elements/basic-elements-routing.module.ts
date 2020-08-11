import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BasicElementsComponent} from './basic-elements.component';

const routes: Routes = [
  {
    path: '',
    component: BasicElementsComponent,
    data: {
      breadcrumb: 'Form Components',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicElementsRoutingModule { }
