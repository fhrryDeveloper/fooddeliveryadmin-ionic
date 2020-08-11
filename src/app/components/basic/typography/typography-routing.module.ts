import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TypographyComponent} from './typography.component';

const routes: Routes = [
  {
    path: '',
    component: TypographyComponent,
    data: {
      breadcrumb: 'Typography',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypographyRoutingModule { }
