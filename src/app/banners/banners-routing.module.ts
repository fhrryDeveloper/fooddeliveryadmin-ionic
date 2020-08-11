import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannersComponent } from './banners.component';


const routes: Routes = [
  {
    path: '',
    component: BannersComponent,
    data: {
      breadcrumb: 'Banners'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannersRoutingModule { }
