import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewdriverComponent } from './newdriver.component';


const routes: Routes = [
  {
    path: '',
    component: NewdriverComponent,
    data: {
      breadcrumb: 'Create new Driver'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewdriverRoutingModule { }
