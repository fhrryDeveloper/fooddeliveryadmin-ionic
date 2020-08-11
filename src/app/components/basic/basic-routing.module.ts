import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Basic Components',
      status: false
    },
    children: [
      {
        path: 'button',
        loadChildren: () => import('./button/button.module').then(m => m.ButtonModule)
      }, {
        path: 'typography',
        loadChildren: () => import('./typography/typography.module').then(m => m.TypographyModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
