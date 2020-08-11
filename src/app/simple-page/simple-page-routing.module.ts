import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SimplePageComponent} from './simple-page.component';

const routes: Routes = [
  {
    path: '',
    component: SimplePageComponent,
    data: {
      breadcrumb: 'Sample Page',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit - Sample Page',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimplePageRoutingModule { }
