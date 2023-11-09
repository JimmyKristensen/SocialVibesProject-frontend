import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvidchatPage } from './invidchat.page';

const routes: Routes = [
  {
    path: '',
    component: InvidchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvidchatPageRoutingModule {}
