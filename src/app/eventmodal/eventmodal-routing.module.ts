import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventmodalPage } from './eventmodal.page';

const routes: Routes = [
  {
    path: '',
    component: EventmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventmodalPageRoutingModule {}
