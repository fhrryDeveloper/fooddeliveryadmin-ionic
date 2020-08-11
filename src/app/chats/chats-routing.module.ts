import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatsComponent } from './chats.component';


const routes: Routes = [
  {
    path: '',
    component: ChatsComponent,
    data: {
      breadcrumb: 'Chats'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
