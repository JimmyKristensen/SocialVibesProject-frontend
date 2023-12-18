import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunitychatPage } from './communitychat.page';

const routes: Routes = [
  {
    path: '',
    component: CommunitychatPage
  },
  {
    path:":id",
    component: CommunitychatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunitychatPageRoutingModule {}
