import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportsComponent } from './supports.component';


const routes: Routes = [
  {
    path: '',
    component: SupportsComponent,
    data: {
      breadcrumb: 'Support Chat'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportsRoutingModule { }
