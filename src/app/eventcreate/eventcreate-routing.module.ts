import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventcreatePage } from './eventcreate.page';

const routes: Routes = [
  {
    path: '',
    component: EventcreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventcreatePageRoutingModule {}
