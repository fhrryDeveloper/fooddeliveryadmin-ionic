import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewbannerComponent } from './newbanner.component';


const routes: Routes = [
  {
    path: '',
    component: NewbannerComponent,
    data: {
      breadcrumb: 'New Banners'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewbannerRoutingModule { }
