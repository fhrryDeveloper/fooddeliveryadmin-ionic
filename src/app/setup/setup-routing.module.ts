import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './setup.component';


const routes: Routes = [
  {
    path: '',
    component: SetupComponent,
    data: {
      breadcrumb: 'Setup'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
