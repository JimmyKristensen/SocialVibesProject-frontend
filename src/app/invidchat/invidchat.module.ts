import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvidchatPageRoutingModule } from './invidchat-routing.module';

import { InvidchatPage } from './invidchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvidchatPageRoutingModule,
  ],
  declarations: [InvidchatPage]
})
export class InvidchatPageModule {}
