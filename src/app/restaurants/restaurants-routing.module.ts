import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantsComponent } from './restaurants.component';


const routes: Routes = [
  {
    path: '',
    component: RestaurantsComponent,
    data: {
      breadcrumb: 'Restaurants'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
