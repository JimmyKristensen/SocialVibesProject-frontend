import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventJoinedPage } from './event-joined.page';

const routes: Routes = [
  {
    path: '',
    component: EventJoinedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventJoinedPageRoutingModule {}
