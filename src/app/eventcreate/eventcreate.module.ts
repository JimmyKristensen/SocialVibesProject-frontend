import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { EventcreatePageRoutingModule } from './eventcreate-routing.module';

import { EventcreatePage } from './eventcreate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventcreatePageRoutingModule
  ],
  declarations: [EventcreatePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventcreatePageModule {}
