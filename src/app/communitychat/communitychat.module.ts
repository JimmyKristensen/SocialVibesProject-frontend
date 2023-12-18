import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunitychatPageRoutingModule } from './communitychat-routing.module';

import { CommunitychatPage } from './communitychat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunitychatPageRoutingModule
  ],
  declarations: [CommunitychatPage]
})
export class CommunitychatPageModule {}
