import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventJoinedPageRoutingModule } from './event-joined-routing.module';

import { EventJoinedPage } from './event-joined.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventJoinedPageRoutingModule
  ],
  declarations: [EventJoinedPage]
})
export class EventJoinedPageModule {}
