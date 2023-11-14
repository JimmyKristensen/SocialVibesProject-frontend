// shared.module.ts
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [

  ],
  imports: [
    IonicModule, 
    CommonModule, 
  ],
  exports: [
    IonicModule,
  ],
})
export class SharedModule {}
